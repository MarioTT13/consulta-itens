import type { RealtimeChannel } from "@supabase/supabase-js"
import { getSupabase } from "../lib/supabase"
import type { ItemConsulta, MovimentoEntrada, MovimentoSaida } from "../types/item"

export type ItemRow = {
  id: string
  created_at: string
  updated_at: string | null
  codigo: string | null
  descricao: string | null
  unidade: string | null
  estoque_atual: number | string | null
}

export type EntradaRow = {
  id: string
  created_at: string
  numero_nf: string | null
  item_id: string | null
  quantidade: number | string | null
  preco_unitario: number | string | null
  fornecedor: string | null
  data_entrada: string | null
}

export type SaidaRow = {
  id: string
  created_at: string
  numero_nf: string | null
  item_id: string | null
  quantidade: number | string | null
  preco_unitario: number | string | null
  cliente: string | null
  data_saida: string | null
}

export type EstoqueCarregado = {
  itens: ItemRow[]
  entradas: EntradaRow[]
  saidas: SaidaRow[]
}

function numero(valor: number | string | null | undefined) {
  if (typeof valor === "number" && Number.isFinite(valor)) return valor
  if (typeof valor === "string" && valor.trim() !== "") {
    const convertido = Number(valor)
    if (Number.isFinite(convertido)) return convertido
  }
  return null
}

function texto(valor: string | null | undefined, vazio = "—") {
  const limpo = valor?.trim()
  return limpo ? limpo : vazio
}

function dataMovimento(preferida: string | null | undefined, criadoEm: string) {
  const limpa = preferida?.trim()
  return limpa || criadoEm
}

export function mapearEntrada(row: EntradaRow): MovimentoEntrada | null {
  if (!row.id || !row.created_at) return null
  return {
    id: row.id,
    criadoEm: row.created_at,
    data: dataMovimento(row.data_entrada, row.created_at),
    notaFiscal: texto(row.numero_nf),
    fornecedor: texto(row.fornecedor),
    quantidade: numero(row.quantidade),
    precoUnitario: numero(row.preco_unitario),
  }
}

export function mapearSaida(row: SaidaRow): MovimentoSaida | null {
  if (!row.id || !row.created_at) return null
  return {
    id: row.id,
    criadoEm: row.created_at,
    data: dataMovimento(row.data_saida, row.created_at),
    notaFiscal: texto(row.numero_nf),
    cliente: texto(row.cliente),
    quantidade: numero(row.quantidade),
    precoUnitario: numero(row.preco_unitario),
  }
}

export function montarItem(
  item: ItemRow,
  entradas: EntradaRow[],
  saidas: SaidaRow[],
): ItemConsulta {
  const entradasDoItem = entradas
    .filter((entrada) => entrada.item_id === item.id)
    .map(mapearEntrada)
    .filter((entrada): entrada is MovimentoEntrada => entrada !== null)

  const saidasDoItem = saidas
    .filter((saida) => saida.item_id === item.id)
    .map(mapearSaida)
    .filter((saida): saida is MovimentoSaida => saida !== null)

  return {
    id: item.id,
    codigo: texto(item.codigo, "Sem código"),
    descricao: texto(item.descricao, texto(item.codigo, "Item sem descrição")),
    unidade: texto(item.unidade, "UN"),
    estoqueAtual: numero(item.estoque_atual),
    entradas: entradasDoItem,
    saidas: saidasDoItem,
  }
}

export function incluirNoTopo<T extends { id: string }>(lista: T[], registro: T) {
  if (lista.some((item) => item.id === registro.id)) return lista
  return [registro, ...lista]
}

export async function buscarItem(id: string) {
  const { data, error } = await getSupabase().from("itens").select("*").eq("id", id).maybeSingle()
  if (error || !data) return null
  return data as ItemRow
}

export async function carregarEstoque(): Promise<EstoqueCarregado> {
  const supabase = getSupabase()
  const [itens, entradas, saidas] = await Promise.all([
    supabase.from("itens").select("*").order("codigo", { ascending: true }),
    supabase.from("entradas").select("*").order("created_at", { ascending: false }),
    supabase.from("saidas").select("*").order("created_at", { ascending: false }),
  ])

  const falha = itens.error ?? entradas.error ?? saidas.error
  if (falha) {
    throw new Error("Não foi possível carregar os dados do Supabase.")
  }

  return {
    itens: (itens.data ?? []) as ItemRow[],
    entradas: (entradas.data ?? []) as EntradaRow[],
    saidas: (saidas.data ?? []) as SaidaRow[],
  }
}

export function inscreverMovimentos(aoInserir: {
  entrada: (registro: EntradaRow) => void
  saida: (registro: SaidaRow) => void
}) {
  const supabase = getSupabase()
  const canal: RealtimeChannel = supabase
    .channel(`movimentos-estoque-${crypto.randomUUID()}`)
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "entradas" },
      (payload) => {
        aoInserir.entrada(payload.new as EntradaRow)
      },
    )
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "saidas" },
      (payload) => {
        aoInserir.saida(payload.new as SaidaRow)
      },
    )
    .subscribe()

  return () => {
    void supabase.removeChannel(canal)
  }
}

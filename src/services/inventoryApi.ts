import { ITENS_MOCK } from "../data/mockItems"
import type { ItemConsulta, ResultadoConsulta } from "../types/item"

const ATRASO_MOCK_MS = 700

function baseUrl() {
  const valor = import.meta.env.VITE_API_BASE_URL
  if (typeof valor !== "string") return ""
  return valor.trim().replace(/\/$/, "")
}

function esperar(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

function isRegistro(valor: unknown): valor is Record<string, unknown> {
  return typeof valor === "object" && valor !== null
}

function isMovimentoBase(valor: unknown) {
  if (!isRegistro(valor)) return false
  return (
    typeof valor.data === "string" &&
    typeof valor.notaFiscal === "string" &&
    typeof valor.quantidade === "number" &&
    typeof valor.precoUnitario === "number"
  )
}

function isItemConsulta(valor: unknown): valor is ItemConsulta {
  if (!isRegistro(valor)) return false
  if (
    typeof valor.codigo !== "string" ||
    typeof valor.descricao !== "string" ||
    typeof valor.unidade !== "string" ||
    typeof valor.estoqueAtual !== "number" ||
    !Array.isArray(valor.entradas) ||
    !Array.isArray(valor.saidas)
  ) {
    return false
  }

  const entradasValidas = valor.entradas.every(
    (entrada) => isMovimentoBase(entrada) && typeof entrada.fornecedor === "string",
  )
  const saidasValidas = valor.saidas.every(
    (saida) => isMovimentoBase(saida) && typeof saida.cliente === "string",
  )

  return entradasValidas && saidasValidas
}

async function consultarNaApi(base: string, codigo: string): Promise<ItemConsulta> {
  const resposta = await fetch(`${base}/itens/${encodeURIComponent(codigo)}`, {
    method: "GET",
    headers: { Accept: "application/json" },
  })

  if (resposta.status === 404) {
    throw new Error(`Nenhum item encontrado para "${codigo}".`)
  }

  if (!resposta.ok) {
    throw new Error("Não foi possível consultar o item. Tente novamente.")
  }

  const corpo: unknown = await resposta.json()
  if (!isItemConsulta(corpo)) {
    throw new Error("A API retornou um formato de item inesperado.")
  }

  return corpo
}

function consultarNoMock(codigo: string) {
  const termo = codigo.trim().toLowerCase()
  return ITENS_MOCK.find((item) => item.codigo.toLowerCase() === termo) ?? null
}

/**
 * Consulta um item pelo código ou SKU.
 * Com VITE_API_BASE_URL definido, faz GET {base}/itens/:codigo.
 * Sem a variável, usa o catálogo local de demonstração.
 */
export async function consultarItem(codigo: string): Promise<ResultadoConsulta> {
  const termo = codigo.trim()
  if (!termo) {
    throw new Error("Informe o código ou SKU do item.")
  }

  const base = baseUrl()
  if (base) {
    const item = await consultarNaApi(base, termo)
    return { item, fonte: "api" }
  }

  await esperar(ATRASO_MOCK_MS)
  const item = consultarNoMock(termo)
  if (!item) {
    throw new Error(`Nenhum item encontrado para "${termo}".`)
  }

  return { item, fonte: "mock" }
}

import { useEffect, useMemo, useRef, useState } from "react"
import { Loader2, Warehouse } from "lucide-react"
import { HistorySection } from "./components/HistorySection"
import { ProductHeader } from "./components/ProductHeader"
import { SearchBar } from "./components/SearchBar"
import { SummaryCards } from "./components/SummaryCards"
import {
  buscarItem,
  carregarEstoque,
  incluirNoTopo,
  inscreverMovimentos,
  montarItem,
  type EntradaRow,
  type ItemRow,
  type SaidaRow,
} from "./services/estoque"

function itemInicial(itens: ItemRow[], entradas: EntradaRow[], saidas: SaidaRow[]) {
  const recente = [...entradas, ...saidas].sort((a, b) => b.created_at.localeCompare(a.created_at))[0]
  if (recente?.item_id) {
    const relacionado = itens.find((item) => item.id === recente.item_id)
    if (relacionado) return relacionado
  }
  return itens[0] ?? null
}

function App() {
  const [codigo, setCodigo] = useState("")
  const [itens, setItens] = useState<ItemRow[]>([])
  const [entradas, setEntradas] = useState<EntradaRow[]>([])
  const [saidas, setSaidas] = useState<SaidaRow[]>([])
  const [selecionadoId, setSelecionadoId] = useState<string | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)
  const itensRef = useRef<ItemRow[]>([])
  const selecionadoRef = useRef<string | null>(null)

  useEffect(() => {
    itensRef.current = itens
    selecionadoRef.current = selecionadoId
  }, [itens, selecionadoId])

  async function incorporarItem(itemId: string | null) {
    if (!itemId) return
    let item = itensRef.current.find((registro) => registro.id === itemId) ?? null
    if (!item) {
      item = await buscarItem(itemId)
      if (!item) return
      const recebido = item
      setItens((atual) => (atual.some((registro) => registro.id === recebido.id) ? atual : [...atual, recebido]))
    }
    if (!selecionadoRef.current) {
      setSelecionadoId(item.id)
      if (item.codigo) setCodigo(item.codigo)
    }
  }

  useEffect(() => {
    let ativo = true

    async function carregar() {
      setCarregando(true)
      setErro(null)
      try {
        const dados = await carregarEstoque()
        if (!ativo) return
        setItens(dados.itens)
        setEntradas(dados.entradas)
        setSaidas(dados.saidas)
        const inicial = itemInicial(dados.itens, dados.entradas, dados.saidas)
        setSelecionadoId(inicial?.id ?? null)
        setCodigo(inicial?.codigo ?? "")
      } catch (error) {
        if (!ativo) return
        setSelecionadoId(null)
        setErro(error instanceof Error ? error.message : "Não foi possível carregar os dados do Supabase.")
      } finally {
        if (ativo) setCarregando(false)
      }
    }

    void carregar()

    let cancelar = () => {}
    try {
      cancelar = inscreverMovimentos({
        entrada: (registro) => {
          setEntradas((atual) => incluirNoTopo(atual, registro))
          void incorporarItem(registro.item_id)
        },
        saida: (registro) => {
          setSaidas((atual) => incluirNoTopo(atual, registro))
          void incorporarItem(registro.item_id)
        },
      })
    } catch {
      cancelar = () => {}
    }

    return () => {
      ativo = false
      cancelar()
    }
  }, [])

  const selecionado = itens.find((item) => item.id === selecionadoId) ?? null
  const item = useMemo(
    () => (selecionado ? montarItem(selecionado, entradas, saidas) : null),
    [selecionado, entradas, saidas],
  )
  const exemplos = itens.map((registro) => registro.codigo).filter((valor): valor is string => Boolean(valor))

  function consultar(termo: string) {
    const codigoBusca = termo.trim()
    setCodigo(termo)
    if (!codigoBusca) {
      setSelecionadoId(null)
      setErro("Informe o código ou SKU do item.")
      return
    }

    const encontrado = itens.find((registro) => registro.codigo?.trim().toLowerCase() === codigoBusca.toLowerCase())
    if (!encontrado) {
      setSelecionadoId(null)
      setErro(`Nenhum item encontrado para "${codigoBusca}".`)
      return
    }

    setErro(null)
    setSelecionadoId(encontrado.id)
    setCodigo(encontrado.codigo ?? codigoBusca)
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <div className="h-1 bg-slate-900" />
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-5 sm:px-6">
          <span className="flex size-10 items-center justify-center rounded-xl bg-slate-900 text-white">
            <Warehouse className="size-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-slate-400 uppercase">
              Estoque
            </p>
            <h1 className="text-xl font-semibold tracking-tight text-slate-900">Consulta de itens</h1>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:px-6 sm:py-8">
        <SearchBar
          codigo={codigo}
          carregando={carregando}
          erro={erro}
          exemplos={exemplos}
          onCodigoChange={setCodigo}
          onConsultar={consultar}
        />

        {carregando && !item ? (
          <p className="mx-auto flex max-w-3xl items-center justify-center gap-2 text-sm text-slate-500">
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Carregando dados do estoque...
          </p>
        ) : null}

        {!carregando && !erro && itens.length === 0 ? (
          <p className="mx-auto max-w-3xl px-2 text-center text-sm leading-6 text-slate-500">
            Nenhum item cadastrado no momento. Novas notas aparecem aqui automaticamente.
          </p>
        ) : null}

        {item ? (
          <div className="flex flex-col gap-4" aria-busy={carregando}>
            <ProductHeader item={item} fonte="supabase" />
            <SummaryCards item={item} />
            <HistorySection item={item} />
          </div>
        ) : null}
      </main>
    </div>
  )
}

export default App

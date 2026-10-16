import { useState } from "react"
import { Warehouse } from "lucide-react"
import { HistorySection } from "./components/HistorySection"
import { ProductHeader } from "./components/ProductHeader"
import { SearchBar } from "./components/SearchBar"
import { SummaryCards } from "./components/SummaryCards"
import { ITEM_INICIAL } from "./data/mockItems"
import { consultarItem } from "./services/inventoryApi"
import type { FonteConsulta, ItemConsulta } from "./types/item"

function App() {
  const [codigo, setCodigo] = useState(ITEM_INICIAL.codigo)
  const [item, setItem] = useState<ItemConsulta | null>(ITEM_INICIAL)
  const [fonte, setFonte] = useState<FonteConsulta>("mock")
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  async function consultar(termo: string) {
    setCodigo(termo)
    setCarregando(true)
    setErro(null)

    try {
      const resultado = await consultarItem(termo)
      setItem(resultado.item)
      setFonte(resultado.fonte)
    } catch (error) {
      setItem(null)
      setErro(error instanceof Error ? error.message : "Não foi possível consultar o item.")
    } finally {
      setCarregando(false)
    }
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
        <p className="max-w-2xl text-sm leading-6 text-slate-500">
          Informe o código ou SKU para ver o saldo, a última movimentação e o histórico de notas
          fiscais.
        </p>

        <SearchBar
          codigo={codigo}
          carregando={carregando}
          erro={erro}
          onCodigoChange={setCodigo}
          onConsultar={(termo) => {
            void consultar(termo)
          }}
        />

        {item ? (
          <div
            className={`flex flex-col gap-4 transition ${carregando ? "pointer-events-none opacity-50" : ""}`}
            aria-busy={carregando}
          >
            <ProductHeader item={item} fonte={fonte} />
            <SummaryCards item={item} />
            <HistorySection item={item} />
          </div>
        ) : null}
      </main>
    </div>
  )
}

export default App

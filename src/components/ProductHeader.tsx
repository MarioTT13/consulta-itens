import { Package } from "lucide-react"
import { formatarQuantidade } from "../lib/format"
import type { FonteConsulta, ItemConsulta } from "../types/item"

type ProductHeaderProps = {
  item: ItemConsulta
  fonte: FonteConsulta
}

export function ProductHeader({ item, fonte }: ProductHeaderProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60 sm:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 font-mono text-sm font-medium tracking-wide text-white">
              {item.codigo}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
              <Package className="size-3.5" aria-hidden="true" />
              {fonte === "api" ? "Consulta via API" : "Dados de demonstração"}
            </span>
          </div>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {item.descricao}
          </h2>
          <p className="mt-2 text-sm text-slate-500">Unidade de medida: {item.unidade}</p>
        </div>

        <div className="w-full shrink-0 rounded-xl bg-slate-900 px-6 py-5 text-white sm:w-auto sm:min-w-64">
          <p className="text-xs font-semibold tracking-[0.16em] text-slate-400 uppercase">
            Estoque atual
          </p>
          <p className="mt-2 flex items-baseline gap-2">
            <span className="text-5xl font-semibold tracking-tight tabular-nums">
              {formatarQuantidade(item.estoqueAtual)}
            </span>
            <span className="text-lg font-semibold text-emerald-300">{item.unidade}</span>
          </p>
        </div>
      </div>
    </article>
  )
}

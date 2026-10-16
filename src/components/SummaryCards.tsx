import { ArrowDownToLine, ArrowUpFromLine, FileText } from "lucide-react"
import { formatarData, formatarMoeda, formatarQuantidade } from "../lib/format"
import type { ItemConsulta, MovimentoEntrada, MovimentoSaida } from "../types/item"

type SummaryCardsProps = {
  item: ItemConsulta
}

function ultimaEntrada(entradas: MovimentoEntrada[]) {
  return [...entradas].sort((a, b) => b.data.localeCompare(a.data))[0] ?? null
}

function ultimaSaida(saidas: MovimentoSaida[]) {
  return [...saidas].sort((a, b) => b.data.localeCompare(a.data))[0] ?? null
}

function Campo({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-[11px] font-semibold tracking-wide text-slate-500 uppercase">{rotulo}</dt>
      <dd className="mt-1 text-sm font-semibold text-balance text-slate-900" title={valor}>
        {valor}
      </dd>
    </div>
  )
}

export function SummaryCards({ item }: SummaryCardsProps) {
  const entrada = ultimaEntrada(item.entradas)
  const saida = ultimaSaida(item.saidas)

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <article className="rounded-xl border border-emerald-200 bg-emerald-50/80 p-5 shadow-sm shadow-emerald-100/80">
        <header className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
            <ArrowDownToLine className="size-5" aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-base font-semibold text-emerald-950">Última entrada</h3>
            <p className="text-xs text-emerald-800/80">Recebimento mais recente</p>
          </div>
        </header>

        {entrada ? (
          <dl className="mt-5 grid grid-cols-2 gap-4">
            <Campo rotulo="Data" valor={formatarData(entrada.data)} />
            <Campo
              rotulo="Quantidade"
              valor={formatarQuantidade(entrada.quantidade, item.unidade)}
            />
            <Campo rotulo="Preço unitário de custo" valor={formatarMoeda(entrada.precoUnitario)} />
            <Campo rotulo="Fornecedor" valor={entrada.fornecedor} />
          </dl>
        ) : (
          <p className="mt-5 text-sm text-emerald-900/70">Nenhuma entrada registrada.</p>
        )}

        {entrada ? (
          <p className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white/70 px-2.5 py-1.5 font-mono text-xs font-medium text-emerald-950">
            <FileText className="size-3.5" aria-hidden="true" />
            {entrada.notaFiscal}
          </p>
        ) : null}
      </article>

      <article className="rounded-xl border border-orange-200 bg-orange-50/80 p-5 shadow-sm shadow-orange-100/80">
        <header className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-orange-500 text-white">
            <ArrowUpFromLine className="size-5" aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-base font-semibold text-orange-950">Última saída</h3>
            <p className="text-xs text-orange-800/80">Venda ou baixa mais recente</p>
          </div>
        </header>

        {saida ? (
          <dl className="mt-5 grid grid-cols-2 gap-4">
            <Campo rotulo="Data" valor={formatarData(saida.data)} />
            <Campo rotulo="Quantidade" valor={formatarQuantidade(saida.quantidade, item.unidade)} />
            <Campo rotulo="Preço unitário de venda" valor={formatarMoeda(saida.precoUnitario)} />
            <Campo rotulo="Cliente" valor={saida.cliente} />
          </dl>
        ) : (
          <p className="mt-5 text-sm text-orange-900/70">Nenhuma saída registrada.</p>
        )}

        {saida ? (
          <p className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white/70 px-2.5 py-1.5 font-mono text-xs font-medium text-orange-950">
            <FileText className="size-3.5" aria-hidden="true" />
            {saida.notaFiscal}
          </p>
        ) : null}
      </article>
    </div>
  )
}

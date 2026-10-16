import { formatarData, formatarMoeda, formatarQuantidade, valorTotal } from "../lib/format"
import type { ItemConsulta } from "../types/item"

type HistorySectionProps = {
  item: ItemConsulta
}

type Linha = {
  data: string
  notaFiscal: string
  parte: string
  quantidade: number
  precoUnitario: number
}

function ordenar(linhas: Linha[]) {
  return [...linhas].sort((a, b) => b.data.localeCompare(a.data))
}

function TabelaHistorico({
  titulo,
  descricao,
  rotuloParte,
  linhas,
  unidade,
  vazio,
}: {
  titulo: string
  descricao: string
  rotuloParte: string
  linhas: Linha[]
  unidade: string
  vazio: string
}) {
  const ordenadas = ordenar(linhas)

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm shadow-slate-200/60">
      <header className="flex flex-wrap items-end justify-between gap-2 border-b border-slate-100 px-5 py-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{titulo}</h3>
          <p className="mt-0.5 text-sm text-slate-500">{descricao}</p>
        </div>
        <p className="text-xs font-medium text-slate-500">
          {ordenadas.length} {ordenadas.length === 1 ? "registro" : "registros"}
        </p>
      </header>

      <div className="divide-y divide-slate-100 md:hidden">
        {ordenadas.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-slate-500">{vazio}</p>
        ) : (
          ordenadas.map((linha) => (
            <article key={`${linha.notaFiscal}-${linha.data}`} className="px-4 py-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900">{linha.parte}</p>
                  <p className="mt-1 font-mono text-xs text-slate-500">{linha.notaFiscal}</p>
                </div>
                <p className="shrink-0 text-sm font-semibold text-slate-900 tabular-nums">
                  {formatarMoeda(valorTotal(linha.quantidade, linha.precoUnitario))}
                </p>
              </div>
              <dl className="mt-3 grid grid-cols-3 gap-2 text-xs">
                <div>
                  <dt className="font-semibold tracking-wide text-slate-400 uppercase">Data</dt>
                  <dd className="mt-1 text-slate-700">{formatarData(linha.data)}</dd>
                </div>
                <div>
                  <dt className="font-semibold tracking-wide text-slate-400 uppercase">Qtd.</dt>
                  <dd className="mt-1 font-medium text-slate-800 tabular-nums">
                    {formatarQuantidade(linha.quantidade, unidade)}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold tracking-wide text-slate-400 uppercase">Unitário</dt>
                  <dd className="mt-1 text-slate-700 tabular-nums">{formatarMoeda(linha.precoUnitario)}</dd>
                </div>
              </dl>
            </article>
          ))
        )}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-slate-50 text-[11px] tracking-wide text-slate-500 uppercase">
              <th scope="col" className="px-5 py-3 font-semibold">
                Data
              </th>
              <th scope="col" className="px-5 py-3 font-semibold">
                Nº da nota fiscal (NF)
              </th>
              <th scope="col" className="px-5 py-3 font-semibold">
                {rotuloParte}
              </th>
              <th scope="col" className="px-5 py-3 text-right font-semibold">
                Quantidade
              </th>
              <th scope="col" className="px-5 py-3 text-right font-semibold">
                Preço unitário
              </th>
              <th scope="col" className="px-5 py-3 text-right font-semibold">
                Valor total
              </th>
            </tr>
          </thead>
          <tbody>
            {ordenadas.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-slate-500">
                  {vazio}
                </td>
              </tr>
            ) : (
              ordenadas.map((linha) => (
                <tr
                  key={`${linha.notaFiscal}-${linha.data}`}
                  className="border-t border-slate-100 transition hover:bg-slate-50/80"
                >
                  <td className="px-5 py-3.5 whitespace-nowrap text-slate-700">
                    {formatarData(linha.data)}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs font-medium text-slate-700">
                      {linha.notaFiscal}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-slate-800">{linha.parte}</td>
                  <td className="px-5 py-3.5 text-right font-medium text-slate-800 tabular-nums">
                    {formatarQuantidade(linha.quantidade, unidade)}
                  </td>
                  <td className="px-5 py-3.5 text-right text-slate-700 tabular-nums">
                    {formatarMoeda(linha.precoUnitario)}
                  </td>
                  <td className="px-5 py-3.5 text-right font-semibold text-slate-900 tabular-nums">
                    {formatarMoeda(valorTotal(linha.quantidade, linha.precoUnitario))}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export function HistorySection({ item }: HistorySectionProps) {
  const entradas: Linha[] = item.entradas.map((entrada) => ({
    data: entrada.data,
    notaFiscal: entrada.notaFiscal,
    parte: entrada.fornecedor,
    quantidade: entrada.quantidade,
    precoUnitario: entrada.precoUnitario,
  }))

  const saidas: Linha[] = item.saidas.map((saida) => ({
    data: saida.data,
    notaFiscal: saida.notaFiscal,
    parte: saida.cliente,
    quantidade: saida.quantidade,
    precoUnitario: saida.precoUnitario,
  }))

  return (
    <div className="space-y-4">
      <TabelaHistorico
        titulo="Histórico de entradas"
        descricao="Notas de compra e recebimento do item"
        rotuloParte="Fornecedor"
        linhas={entradas}
        unidade={item.unidade}
        vazio="Nenhuma entrada registrada para este item."
      />
      <TabelaHistorico
        titulo="Histórico de saídas"
        descricao="Notas de venda e baixa do item"
        rotuloParte="Cliente"
        linhas={saidas}
        unidade={item.unidade}
        vazio="Nenhuma saída registrada para este item."
      />
    </div>
  )
}

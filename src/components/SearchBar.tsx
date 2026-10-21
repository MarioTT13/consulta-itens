import { AlertCircle, Hash, Loader2, Search } from "lucide-react"

type SearchBarProps = {
  codigo: string
  carregando: boolean
  erro: string | null
  exemplos: string[]
  onCodigoChange: (valor: string) => void
  onConsultar: (codigo: string) => void
}

export function SearchBar({
  codigo,
  carregando,
  erro,
  exemplos,
  onCodigoChange,
  onConsultar,
}: SearchBarProps) {
  return (
    <section className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-200/80 bg-white p-6 shadow-md shadow-slate-200/70 sm:p-8">
      <form
        onSubmit={(event) => {
          event.preventDefault()
          onConsultar(codigo)
        }}
      >
        <label htmlFor="codigo-item" className="text-sm font-medium tracking-wide text-slate-500">
          Informe o Codigo
        </label>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative min-w-0 flex-1">
            <Hash
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              id="codigo-item"
              name="codigo"
              value={codigo}
              onChange={(event) => onCodigoChange(event.target.value)}
              placeholder="Ex.: ITEM-1002"
              autoComplete="off"
              spellCheck={false}
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pr-4 pl-10 font-mono text-sm text-slate-900 outline-none transition placeholder:font-sans placeholder:text-slate-400 focus:border-slate-300 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
            />
          </div>
          <button
            type="submit"
            disabled={carregando}
            className="inline-flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-wait disabled:opacity-80 sm:w-auto"
          >
            {carregando ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <Search className="size-4" aria-hidden="true" />
            )}
            {carregando ? "Consultando" : "Consultar"}
          </button>
        </div>
      </form>

      {exemplos.length > 0 ? (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-500">Itens</span>
          {exemplos.map((exemplo) => (
            <button
              key={exemplo}
              type="button"
              onClick={() => onConsultar(exemplo)}
              disabled={carregando}
              className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-xs text-slate-600 transition hover:border-slate-300 hover:bg-white disabled:opacity-60"
            >
              {exemplo}
            </button>
          ))}
        </div>
      ) : null}

      {erro ? (
        <div
          role="alert"
          className="mt-4 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-3 text-sm text-rose-800"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <p>{erro}</p>
        </div>
      ) : null}
    </section>
  )
}

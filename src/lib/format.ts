const moeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
})

const quantidade = new Intl.NumberFormat("pt-BR", {
  maximumFractionDigits: 2,
})

export function formatarData(iso: string) {
  const dataPura = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso)
  if (dataPura) return `${dataPura[3]}/${dataPura[2]}/${dataPura[1]}`

  const data = new Date(iso)
  if (Number.isNaN(data.getTime())) return iso
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(data)
}

export function formatarMoeda(valor: number) {
  return moeda.format(valor)
}

export function formatarQuantidade(valor: number, unidade?: string) {
  const numero = quantidade.format(valor)
  return unidade ? `${numero} ${unidade}` : numero
}

export function valorTotal(qtd: number, precoUnitario: number) {
  return Math.round(qtd * precoUnitario * 100) / 100
}

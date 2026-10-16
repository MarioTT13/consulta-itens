const moeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
})

const quantidade = new Intl.NumberFormat("pt-BR", {
  maximumFractionDigits: 2,
})

export function formatarData(iso: string) {
  const [ano, mes, dia] = iso.split("-")
  if (!ano || !mes || !dia) return iso
  return `${dia}/${mes}/${ano}`
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

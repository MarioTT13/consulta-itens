export type MovimentoEntrada = {
  data: string
  notaFiscal: string
  fornecedor: string
  quantidade: number
  precoUnitario: number
}

export type MovimentoSaida = {
  data: string
  notaFiscal: string
  cliente: string
  quantidade: number
  precoUnitario: number
}

export type ItemConsulta = {
  codigo: string
  descricao: string
  unidade: string
  estoqueAtual: number
  entradas: MovimentoEntrada[]
  saidas: MovimentoSaida[]
}

export type FonteConsulta = "mock" | "api"

export type ResultadoConsulta = {
  item: ItemConsulta
  fonte: FonteConsulta
}

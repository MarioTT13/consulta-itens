export type MovimentoEntrada = {
  id: string
  criadoEm: string
  data: string
  notaFiscal: string
  fornecedor: string
  quantidade: number | null
  precoUnitario: number | null
}

export type MovimentoSaida = {
  id: string
  criadoEm: string
  data: string
  notaFiscal: string
  cliente: string
  quantidade: number | null
  precoUnitario: number | null
}

export type ItemConsulta = {
  id: string
  codigo: string
  descricao: string
  unidade: string
  estoqueAtual: number | null
  entradas: MovimentoEntrada[]
  saidas: MovimentoSaida[]
}

export type FonteConsulta = "supabase"

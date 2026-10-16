import type { ItemConsulta } from "../types/item"

export const ITENS_MOCK: ItemConsulta[] = [
  {
    codigo: "ITEM-1002",
    descricao: "Arruela Autotravante M8 Inox",
    unidade: "UN",
    estoqueAtual: 450,
    entradas: [
      {
        data: "2026-10-02",
        notaFiscal: "NF-10482",
        fornecedor: "Metalúrgica Atlas Ltda",
        quantidade: 200,
        precoUnitario: 0.42,
      },
      {
        data: "2026-07-16",
        notaFiscal: "NF-10255",
        fornecedor: "InoxSul Distribuidora",
        quantidade: 180,
        precoUnitario: 0.4,
      },
      {
        data: "2026-04-09",
        notaFiscal: "NF-09918",
        fornecedor: "Fixpar Componentes Industriais",
        quantidade: 250,
        precoUnitario: 0.38,
      },
      {
        data: "2026-01-21",
        notaFiscal: "NF-09640",
        fornecedor: "Aços Nobre ME",
        quantidade: 120,
        precoUnitario: 0.44,
      },
    ],
    saidas: [
      {
        data: "2026-10-11",
        notaFiscal: "NF-20911",
        cliente: "Construtora Horizonte Ltda",
        quantidade: 80,
        precoUnitario: 0.89,
      },
      {
        data: "2026-09-03",
        notaFiscal: "NF-20766",
        cliente: "Oficina Mecânica Silva",
        quantidade: 45,
        precoUnitario: 0.95,
      },
      {
        data: "2026-06-18",
        notaFiscal: "NF-20490",
        cliente: "Indústria Beta S.A.",
        quantidade: 110,
        precoUnitario: 0.82,
      },
      {
        data: "2026-03-27",
        notaFiscal: "NF-20154",
        cliente: "Manutenção Porto Alegre",
        quantidade: 60,
        precoUnitario: 0.91,
      },
      {
        data: "2026-02-05",
        notaFiscal: "NF-20008",
        cliente: "Serralheria Luz",
        quantidade: 30,
        precoUnitario: 1.05,
      },
    ],
  },
  {
    codigo: "ITEM-0841",
    descricao: "Parafuso Sextavado M10 x 40 Zincado",
    unidade: "UN",
    estoqueAtual: 1280,
    entradas: [
      {
        data: "2026-09-28",
        notaFiscal: "NF-11004",
        fornecedor: "Parafusos Paraná Ltda",
        quantidade: 800,
        precoUnitario: 0.27,
      },
      {
        data: "2026-06-12",
        notaFiscal: "NF-10771",
        fornecedor: "Fixpar Componentes Industriais",
        quantidade: 500,
        precoUnitario: 0.25,
      },
      {
        data: "2026-02-19",
        notaFiscal: "NF-10408",
        fornecedor: "Metalúrgica Atlas Ltda",
        quantidade: 350,
        precoUnitario: 0.29,
      },
    ],
    saidas: [
      {
        data: "2026-10-08",
        notaFiscal: "NF-21033",
        cliente: "Montadora Leste S.A.",
        quantidade: 220,
        precoUnitario: 0.58,
      },
      {
        data: "2026-08-14",
        notaFiscal: "NF-20612",
        cliente: "Construtora Horizonte Ltda",
        quantidade: 90,
        precoUnitario: 0.62,
      },
      {
        data: "2026-05-02",
        notaFiscal: "NF-20288",
        cliente: "Oficina Mecânica Silva",
        quantidade: 60,
        precoUnitario: 0.64,
      },
    ],
  },
  {
    codigo: "SKU-5520",
    descricao: "Porca Sextavada M8 Classe 8",
    unidade: "UN",
    estoqueAtual: 86,
    entradas: [
      {
        data: "2026-08-30",
        notaFiscal: "NF-10890",
        fornecedor: "Aços Nobre ME",
        quantidade: 400,
        precoUnitario: 0.18,
      },
      {
        data: "2026-05-07",
        notaFiscal: "NF-10562",
        fornecedor: "InoxSul Distribuidora",
        quantidade: 250,
        precoUnitario: 0.19,
      },
      {
        data: "2026-01-15",
        notaFiscal: "NF-10102",
        fornecedor: "Parafusos Paraná Ltda",
        quantidade: 180,
        precoUnitario: 0.17,
      },
    ],
    saidas: [
      {
        data: "2026-10-09",
        notaFiscal: "NF-21040",
        cliente: "Serralheria Luz",
        quantidade: 140,
        precoUnitario: 0.41,
      },
      {
        data: "2026-07-22",
        notaFiscal: "NF-20518",
        cliente: "Indústria Beta S.A.",
        quantidade: 200,
        precoUnitario: 0.38,
      },
      {
        data: "2026-04-11",
        notaFiscal: "NF-20190",
        cliente: "Manutenção Porto Alegre",
        quantidade: 75,
        precoUnitario: 0.4,
      },
      {
        data: "2026-02-28",
        notaFiscal: "NF-20061",
        cliente: "Montadora Leste S.A.",
        quantidade: 120,
        precoUnitario: 0.36,
      },
    ],
  },
]

export const CODIGOS_EXEMPLO = ITENS_MOCK.map((item) => item.codigo)

export const ITEM_INICIAL =
  ITENS_MOCK.find((item) => item.codigo === "ITEM-1002") ?? ITENS_MOCK[0]

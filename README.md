# Consulta de itens

Tela de consulta de estoque em React, Tailwind CSS e Lucide. Abre com dados de demonstração e pode consultar uma API real.

## Rodar localmente

```bash
npm install
npm run dev
```

## Conectar uma API

Defina `VITE_API_BASE_URL` com a URL base da API. A consulta faz `GET {base}/itens/{codigo}` e espera:

```json
{
  "codigo": "ITEM-1002",
  "descricao": "Arruela Autotravante M8 Inox",
  "unidade": "UN",
  "estoqueAtual": 450,
  "entradas": [
    {
      "data": "2026-10-02",
      "notaFiscal": "NF-10482",
      "fornecedor": "Metalúrgica Atlas Ltda",
      "quantidade": 200,
      "precoUnitario": 0.42
    }
  ],
  "saidas": [
    {
      "data": "2026-10-11",
      "notaFiscal": "NF-20911",
      "cliente": "Construtora Horizonte Ltda",
      "quantidade": 80,
      "precoUnitario": 0.89
    }
  ]
}
```

Sem essa variável, a tela usa o catálogo local em `src/data/mockItems.ts`.

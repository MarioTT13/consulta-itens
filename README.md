# Consulta de itens

Tela de consulta de estoque em React, Tailwind CSS e Lucide. Os dados vêm do Supabase e as novas notas entram na lista em tempo real.

## Rodar localmente

```bash
npm install
cp .env.example .env
npm run dev
```

Preencha `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY` no `.env`.

A tela lê `itens`, `entradas` e `saidas`. Entradas e saídas ficam ordenadas por `created_at`, da mais recente para a mais antiga. Um listener de `INSERT` acrescenta a nota no topo sem recarregar a página.

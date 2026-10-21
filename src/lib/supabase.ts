import { createClient, type SupabaseClient } from "@supabase/supabase-js"

const URL_PUBLICA = "https://eushpohmhrtevyacbvft.supabase.co"
const CHAVE_PUBLICA = "sb_publishable_7WUcfJd6Z6XZEXvsDqj5ZA_EyaLqNa7"

let cliente: SupabaseClient | null = null

export function getSupabase() {
  if (cliente) return cliente

  const url = import.meta.env.VITE_SUPABASE_URL?.trim() || URL_PUBLICA
  const chave = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim() || CHAVE_PUBLICA

  cliente = createClient(url, chave)
  return cliente
}

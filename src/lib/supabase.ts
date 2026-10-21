import { createClient, type SupabaseClient } from "@supabase/supabase-js"

let cliente: SupabaseClient | null = null

export function getSupabase() {
  if (cliente) return cliente

  const url = import.meta.env.VITE_SUPABASE_URL?.trim()
  const chave = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim()

  if (!url || !chave) {
    throw new Error("Defina VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY.")
  }

  cliente = createClient(url, chave)
  return cliente
}

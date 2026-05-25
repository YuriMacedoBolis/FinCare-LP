// Cliente Supabase do projeto externo "Chat-Bot Financeiro".
// Este arquivo é gerenciado manualmente (não pelo Lovable Cloud).
// As chaves abaixo são públicas (anon/publishable) e seguras para o frontend.
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://bewdvzuzshotucqjfilw.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJld2R2enV6c2hvdHVjcWpmaWx3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3NzI3ODcsImV4cCI6MjA4OTM0ODc4N30.gprFFD6E5bhwBnXG5X74ZWRtpP5-c4wIUVRkCBG8wY4";

const isBrowser = typeof window !== "undefined";

export const externalSupabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: isBrowser ? window.localStorage : undefined,
    persistSession: isBrowser,
    autoRefreshToken: isBrowser,
    storageKey: "fincare-external-auth",
  },
});

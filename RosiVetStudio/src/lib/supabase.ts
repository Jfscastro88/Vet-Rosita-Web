import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Only create client if environment variables are available
// This prevents build-time errors when env vars are not set
export const supabase =
  url && anon
    ? createClient(url, anon, {
        auth: { persistSession: true, autoRefreshToken: true },
      })
    : null;

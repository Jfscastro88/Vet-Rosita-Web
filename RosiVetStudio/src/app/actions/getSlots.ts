"use server";

import { createClient } from "@supabase/supabase-js";

export async function getSlotsInRange(fromISO: string, toISO: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(url, anon);

  const { data, error } = await supabase
    .from("time_slots")
    .select("id, starts_at, ends_at, status")
    .gte("starts_at", fromISO)
    .lt("starts_at", toISO)
    .eq("status", "free")
    .order("starts_at", { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
}

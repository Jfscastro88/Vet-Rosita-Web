"use server";

import { createClient } from "@supabase/supabase-js";

export async function getSlotsInRange(fromISO: string, toISO: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(url, anon);

  // Get current time to filter out past slots
  const now = new Date();
  const nowISO = now.toISOString();

  const { data, error } = await supabase
    .from("time_slots")
    .select("id, starts_at, ends_at, status")
    .gte("starts_at", fromISO)
    .lt("starts_at", toISO)
    .eq("status", "free")
    .gte("starts_at", nowISO) // Only get slots that start in the future
    .order("starts_at", { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
}

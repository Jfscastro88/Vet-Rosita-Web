"use server";

import { createClient } from "@supabase/supabase-js";

export async function cleanupPastSlots() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(url, anon);

  const now = new Date().toISOString();

  // Mark past free slots as expired (or delete them)
  const { data, error } = await supabase
    .from("time_slots")
    .update({ status: "expired" })
    .lt("starts_at", now)
    .eq("status", "free");

  if (error) {
    console.error("Error cleaning up past slots:", error);
    return { ok: false, error: error.message };
  }

  return { ok: true, cleaned: data };
}

export async function getPastSlotsCount() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(url, anon);

  const now = new Date().toISOString();

  const { count, error } = await supabase
    .from("time_slots")
    .select("*", { count: "exact", head: true })
    .lt("starts_at", now)
    .eq("status", "free");

  if (error) {
    console.error("Error counting past slots:", error);
    return { ok: false, error: error.message, count: 0 };
  }

  return { ok: true, count: count || 0 };
}

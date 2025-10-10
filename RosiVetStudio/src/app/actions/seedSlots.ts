"use server";

import { createClient } from "@supabase/supabase-js";

type SeedOptions = {
  days?: number; // how many days ahead to seed
  startHour?: number; // start of day (24h)
  endHour?: number; // end of day (24h)
  stepMinutes?: number; // slot length
  weekdaysOnly?: boolean; // Mon–Fri only
  replaceFreeFuture?: boolean; // optionally delete ONLY future free slots first
};

export async function seedSlots(opts: SeedOptions = {}) {
  const {
    days = 60,
    startHour = 9,
    endHour = 18,
    stepMinutes = 30,
    weekdaysOnly = true,
    replaceFreeFuture = false,
  } = opts;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // server-only
  const supabase = createClient(url, serviceKey);

  // (Optional) clean only FREE future slots — keeps booked/blocked intact
  if (replaceFreeFuture) {
    const { error: delErr } = await supabase
      .from("time_slots")
      .delete()
      .gte("starts_at", new Date().toISOString())
      .eq("status", "free");

    if (delErr) return { ok: false, error: delErr.message };
  }

  const inserts: Array<{ starts_at: string; ends_at: string; status: "free" }> = [];

  for (let i = 0; i < days; i++) {
    const day = new Date();
    day.setDate(day.getDate() + i);
    day.setHours(0, 0, 0, 0);

    // 0 = Sun, 6 = Sat
    const isWeekday = [1, 2, 3, 4, 5].includes(day.getDay());
    if (weekdaysOnly && !isWeekday) continue;

    for (let h = startHour; h < endHour; h++) {
      for (let m = 0; m < 60; m += stepMinutes) {
        const start = new Date(day);
        start.setHours(h, m, 0, 0);
        const end = new Date(start);
        end.setMinutes(end.getMinutes() + stepMinutes);

        // Store UTC; UI formats for Europe/Rome
        inserts.push({
          starts_at: start.toISOString(),
          ends_at: end.toISOString(),
          status: "free",
        });
      }
    }
  }

  if (inserts.length === 0) return { ok: true, inserted: 0 };

  // IMPORTANT: to dedupe cleanly, add this constraint ONCE in SQL:
  //   ALTER TABLE public.time_slots ADD CONSTRAINT uq_time_slots_starts UNIQUE (starts_at);
  //
  // Then we can safely upsert without duplicates.
  const CHUNK = 500;
  for (let i = 0; i < inserts.length; i += CHUNK) {
    const chunk = inserts.slice(i, i + CHUNK);
    const { error } = await supabase
      .from("time_slots")
      .upsert(chunk, { onConflict: "starts_at", ignoreDuplicates: true });
    if (error) return { ok: false, error: error.message };
  }

  return { ok: true, inserted: inserts.length };
}

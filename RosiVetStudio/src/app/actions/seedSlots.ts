"use server";

import { createClient } from "@supabase/supabase-js";

export async function seedSlots() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // server only
  const supabase = createClient(url, serviceKey);

  // Config “clínica” (ajusta aqui)
  const days = 7; // próximos 7 dias
  const startHour = 9; // 09:00
  const endHour = 18; // 18:00
  const stepMinutes = 30; // intervalos de 30min

  const now = new Date();
  now.setSeconds(0, 0);

  const inserts: any[] = [];

  for (let i = 0; i < days; i++) {
    const day = new Date();
    day.setDate(day.getDate() + i);
    day.setHours(0, 0, 0, 0);

    for (let h = startHour; h < endHour; h++) {
      for (let m = 0; m < 60; m += stepMinutes) {
        const start = new Date(day);
        start.setHours(h, m, 0, 0);
        const end = new Date(start);
        end.setMinutes(end.getMinutes() + stepMinutes);

        // guarda em UTC (UI formata Rome)
        inserts.push({
          starts_at: start.toISOString(),
          ends_at: end.toISOString(),
          status: "free",
        });
      }
    }
  }

  // evita duplicar: apaga slots futuros antes (simples)
  const { error: delErr } = await supabase
    .from("time_slots")
    .delete()
    .gte("starts_at", new Date().toISOString());

  if (delErr) {
    return { ok: false, error: delErr.message };
  }

  const { error } = await supabase.from("time_slots").insert(inserts);
  if (error) return { ok: false, error: error.message };
  return { ok: true, count: inserts.length };
}

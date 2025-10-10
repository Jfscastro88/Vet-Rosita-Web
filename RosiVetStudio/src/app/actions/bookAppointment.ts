"use server";

import { createClient } from "@supabase/supabase-js";

export type Input = {
  slotId: string;
  firstName: string;
  lastName: string;
  birthDate: string; // "YYYY-MM-DD"
  phone: string;
  email: string;
  animalType: string;
  animalName: string;
  animalAge?: number;
  notes?: string;
  // medications?: string; // add if your RPC accepts it
};

export async function bookAppointment(input: Input) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(url, anon);

  const { data, error } = await supabase.rpc("book_time_slot_rpc", {
    p_slot_id: input.slotId,
    p_first_name: input.firstName,
    p_last_name: input.lastName,
    p_birth_date: input.birthDate,
    p_phone: input.phone,
    p_email: input.email,
    p_animal_name: input.animalName,
    p_animal_type: input.animalType,
    p_animal_age_years: input.animalAge ?? null,
    p_notes: input.notes ?? null,
    // p_medications: input.medications ?? null, // only if you added this param in SQL
  });

  if (error) return { ok: false, error: error.message };
  // RPC returns the new appointment id (uuid)
  return { ok: true, id: data as string };
}

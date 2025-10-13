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
  medications?: string;
};

export async function bookAppointment(input: Input) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(url, anon);

  // First, verify the slot exists and is not in the past
  const { data: slotData, error: slotError } = await supabase
    .from("time_slots")
    .select("starts_at, status")
    .eq("id", input.slotId)
    .single();

  if (slotError || !slotData) {
    return { ok: false, error: "Slot not found" };
  }

  // Check if the slot is in the past
  const now = new Date();
  const slotTime = new Date(slotData.starts_at);

  if (slotTime <= now) {
    return { ok: false, error: "Cannot book appointments in the past" };
  }

  // Check if slot is still free
  if (slotData.status !== "free") {
    return { ok: false, error: "Time slot is no longer available" };
  }

  // Use the existing RPC function but modify it to create pending appointments
  // For now, let's use the RPC as is and handle the status change separately
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
    p_medications: input.medications ?? null,
  });

  if (error) return { ok: false, error: error.message };

  // After creating the appointment, update it to pending status
  const { error: updateError } = await supabase
    .from("appointments")
    .update({ status: "pending" })
    .eq("id", data);

  if (updateError) {
    console.error("Error updating appointment to pending:", updateError);
    // Don't fail the whole operation, just log the error
  }

  return { ok: true, id: data as string };
}

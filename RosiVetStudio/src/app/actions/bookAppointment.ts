"use server";

import { createClient } from "@supabase/supabase-js";

type Input = {
  slotId: string;
  firstName: string;
  lastName: string;
  birthDate: string; // yyyy-mm-dd
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
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  // 1) pegar o slot (service role só para garantir leitura caso mude policy)
  const admin = createClient(url, service);
  const { data: slot, error: slotErr } = await admin
    .from("time_slots")
    .select("*")
    .eq("id", input.slotId)
    .single();

  if (slotErr || !slot) {
    return { ok: false, error: "Slot non trovato." };
  }
  if (slot.status !== "free") {
    return { ok: false, error: "Questo orario non è più disponibile." };
  }

  // 2) usar anon para respeitar RLS público em inserts
  const supabase = createClient(url, anon);

  // 2.1) cliente: busca por email
  const { data: existingClient } = await supabase
    .from("clients")
    .select("id")
    .eq("email", input.email)
    .maybeSingle();

  let clientId = existingClient?.id;
  if (!clientId) {
    const { data: newClient, error: cErr } = await supabase
      .from("clients")
      .insert({
        first_name: input.firstName,
        last_name: input.lastName,
        birth_date: input.birthDate,
        phone: input.phone,
        email: input.email,
      })
      .select("id")
      .single();
    if (cErr) return { ok: false, error: "Impossibile creare il cliente." };
    clientId = newClient!.id;
  }

  // 2.2) animal: cria sempre (ou poderíamos tentar de-duplicar por nome + tipo)
  const { data: animal, error: aErr } = await supabase
    .from("animals")
    .insert({
      client_id: clientId,
      name: input.animalName,
      type: input.animalType,
      age_years: input.animalAge ?? null,
      notes: input.notes ?? null,
      medications: input.medications ?? null,
    })
    .select("id")
    .single();

  if (aErr) return { ok: false, error: "Impossibile registrare l’animale." };

  // 2.3) appointment: usa starts_at do slot
  const { error: appErr } = await supabase.from("appointments").insert({
    client_id: clientId,
    animal_id: animal!.id,
    scheduled_at: slot.starts_at, // UTC string
    status: "pending",
  });

  if (appErr) return { ok: false, error: "Impossibile creare l’appuntamento." };

  // 3) marca slot como booked (service role para bypass RLS)
  const { error: updErr } = await admin
    .from("time_slots")
    .update({ status: "booked" })
    .eq("id", input.slotId);

  if (updErr) {
    // fallback: ainda temos appointment criado; podemos logar erro
    return { ok: true, warning: "Appuntamento creato, ma il blocco slot ha fallito." };
  }

  return { ok: true };
}

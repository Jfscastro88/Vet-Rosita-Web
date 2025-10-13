"use server";

import { createClient } from "@supabase/supabase-js";

export type Client = {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  birth_date: string;
  created_at: string;
  total_appointments?: number;
  last_appointment?: string;
};

export type ClientFilters = {
  search?: string;
  sort_by?: "name" | "email" | "created_at" | "appointments";
  sort_order?: "asc" | "desc";
};

export async function getClients(filters: ClientFilters = {}) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  // Use service key if available, otherwise fall back to anon key
  const supabase = createClient(url, serviceKey || anonKey);

  let query = supabase.from("clients").select(`
      id,
      first_name,
      last_name,
      phone,
      email,
      birth_date,
      created_at
    `);

  // Apply search filter
  if (filters.search) {
    const searchTerm = `%${filters.search}%`;
    query = query.or(
      `first_name.ilike.${searchTerm},last_name.ilike.${searchTerm},email.ilike.${searchTerm},phone.ilike.${searchTerm}`
    );
  }

  // Apply sorting
  const sortBy = filters.sort_by || "name";
  const sortOrder = filters.sort_order || "asc";

  if (sortBy === "name") {
    query = query.order("last_name", { ascending: sortOrder === "asc" });
  } else if (sortBy === "email") {
    query = query.order("email", { ascending: sortOrder === "asc" });
  } else if (sortBy === "created_at") {
    query = query.order("created_at", { ascending: sortOrder === "asc" });
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching clients:", error);
    return { ok: false, error: error.message, data: [] };
  }

  // If no clients found in clients table, try to extract from appointments/time_slots
  if (!data || data.length === 0) {
    console.log("No clients found, checking appointments/time_slots for client data...");

    // Try appointments table first
    const { data: appointmentsData, error: appointmentsError } = await supabase
      .from("appointments")
      .select(
        "client_first_name, client_last_name, client_phone, client_email, client_birth_date, created_at"
      )
      .not("client_first_name", "is", null);

    if (!appointmentsError && appointmentsData && appointmentsData.length > 0) {
      // Extract unique clients from appointments
      const uniqueClients = new Map();
      appointmentsData.forEach((apt) => {
        const key = `${apt.client_email}`;
        if (!uniqueClients.has(key)) {
          uniqueClients.set(key, {
            id: `client_${apt.client_email}`,
            first_name: apt.client_first_name,
            last_name: apt.client_last_name,
            phone: apt.client_phone,
            email: apt.client_email,
            birth_date: apt.client_birth_date,
            created_at: apt.created_at,
          });
        }
      });

      return { ok: true, data: Array.from(uniqueClients.values()) };
    }

    // Try time_slots table
    const { data: timeSlotsData, error: timeSlotsError } = await supabase
      .from("time_slots")
      .select(
        "client_first_name, client_last_name, client_phone, client_email, client_birth_date, created_at"
      )
      .not("client_first_name", "is", null)
      .eq("status", "booked");

    if (!timeSlotsError && timeSlotsData && timeSlotsData.length > 0) {
      // Extract unique clients from time_slots
      const uniqueClients = new Map();
      timeSlotsData.forEach((slot) => {
        const key = `${slot.client_email}`;
        if (!uniqueClients.has(key)) {
          uniqueClients.set(key, {
            id: `client_${slot.client_email}`,
            first_name: slot.client_first_name,
            last_name: slot.client_last_name,
            phone: slot.client_phone,
            email: slot.client_email,
            birth_date: slot.client_birth_date,
            created_at: slot.created_at,
          });
        }
      });

      return { ok: true, data: Array.from(uniqueClients.values()) };
    }
  }

  return { ok: true, data: data as Client[] };
}

export async function getClientStats() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(url, anon);

  // Try clients table first
  const { data: clientsData, error: clientsError } = await supabase.from("clients").select("id");

  if (clientsError) {
    console.error("Error fetching client stats from clients table:", clientsError);
  }

  // If no clients data, try to count from appointments/time_slots
  if (!clientsData || clientsData.length === 0) {
    console.log("No clients found, checking appointments/time_slots for client count...");

    // Count unique clients from appointments
    const { data: appointmentsData, error: appointmentsError } = await supabase
      .from("appointments")
      .select("client_email")
      .not("client_email", "is", null);

    if (!appointmentsError && appointmentsData) {
      const uniqueEmails = new Set(appointmentsData.map((apt) => apt.client_email));
      return { ok: true, stats: { total: uniqueEmails.size } };
    }

    // Count unique clients from time_slots
    const { data: timeSlotsData, error: timeSlotsError } = await supabase
      .from("time_slots")
      .select("client_email")
      .not("client_email", "is", null)
      .eq("status", "booked");

    if (!timeSlotsError && timeSlotsData) {
      const uniqueEmails = new Set(timeSlotsData.map((slot) => slot.client_email));
      return { ok: true, stats: { total: uniqueEmails.size } };
    }

    return { ok: true, stats: { total: 0 } };
  }

  return { ok: true, stats: { total: clientsData.length } };
}

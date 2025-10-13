"use server";

import { createClient } from "@supabase/supabase-js";

export type Appointment = {
  id: string;
  starts_at: string;
  ends_at: string;
  status: "pending" | "booked" | "confirmed" | "cancelled" | "completed";
  created_at: string;
  updated_at: string;

  // flat fields (coming directly from appointments table)
  client_first_name?: string;
  client_last_name?: string;
  client_phone?: string;
  client_email?: string;
  client_birth_date?: string;

  animal_name?: string;
  animal_type?: string;
  animal_age_years?: number;
  notes?: string;
};

export type AppointmentFilters = {
  search?: string;
  status?: "pending" | "booked" | "confirmed" | "cancelled" | "completed" | "all";
  animal_type?: string;
  date_from?: string; // ISO
  date_to?: string; // ISO
  sort_by?: "date" | "client_name" | "animal_name";
  sort_order?: "asc" | "desc";
};

export async function getAppointments(filters: AppointmentFilters = {}) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const supabase = createClient(url, serviceKey || anonKey);

  let query = supabase.from("appointments").select(`
      id,
      scheduled_at,
      status,
      created_at,
      client_id,
      animal_id,
      clients!inner(
        first_name,
        last_name,
        phone,
        email,
        birth_date
      ),
      animals!inner(
        name,
        type,
        age_years
      )
    `);

  // ── Filters
  if (filters.status && filters.status !== "all") {
    query = query.eq("status", filters.status);
  }

  if (filters.animal_type) {
    query = query.eq("animals.type", filters.animal_type);
  }

  if (filters.date_from) {
    query = query.gte("scheduled_at", filters.date_from);
  }

  if (filters.date_to) {
    query = query.lte("scheduled_at", filters.date_to);
  }

  if (filters.search && filters.search.trim().length > 0) {
    const s = `%${filters.search.trim()}%`;
    // search in joined fields
    query = query.or(
      [
        `clients.first_name.ilike.${s}`,
        `clients.last_name.ilike.${s}`,
        `clients.email.ilike.${s}`,
        `clients.phone.ilike.${s}`,
        `animals.name.ilike.${s}`,
        `animals.type.ilike.${s}`,
      ].join(",")
    );
  }

  // ── Sorting
  const order = filters.sort_order === "desc" ? { ascending: false } : { ascending: true };
  if (filters.sort_by === "client_name") {
    query = query.order("clients.last_name", order);
  } else if (filters.sort_by === "animal_name") {
    query = query.order("animals.name", order);
  } else {
    // default: date
    query = query.order("scheduled_at", order);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching appointments:", error);
    return { ok: false, error: error.message, data: [] as Appointment[] };
  }

  console.log("Raw appointments data from DB:", data);

  // ── Map to UI shape (30-min default end)
  const appointments: Appointment[] =
    (data ?? []).map((row: any) => {
      const start = new Date(row.scheduled_at);
      const end = new Date(start.getTime() + 30 * 60 * 1000).toISOString();

      console.log(`Appointment ${row.id} status:`, row.status, typeof row.status);

      return {
        id: row.id,
        starts_at: row.scheduled_at,
        ends_at: end,
        status: row.status || "pending", // Default to pending if status is null/undefined

        // Use actual joined data
        client_first_name: row.clients?.first_name || "N/A",
        client_last_name: row.clients?.last_name || "N/A",
        client_phone: row.clients?.phone || "N/A",
        client_email: row.clients?.email || "N/A",
        client_birth_date: row.clients?.birth_date,

        animal_name: row.animals?.name || "N/A",
        animal_type: row.animals?.type || "N/A",
        animal_age_years: row.animals?.age_years,
        notes: undefined,

        created_at: row.created_at,
        updated_at: row.created_at,
      };
    }) || [];

  return { ok: true, data: appointments };
}

export async function getAppointmentStats() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  // Use service key if available, otherwise fall back to anon key
  const supabase = createClient(url, serviceKey || anonKey);

  const { data, error } = await supabase.from("appointments").select("status");

  if (error) {
    console.error("Error fetching appointment stats:", error);
    return {
      ok: false,
      error: error.message,
      stats: { total: 0, pending: 0, booked: 0, confirmed: 0, cancelled: 0, completed: 0 },
    };
  }

  const stats = {
    total: data?.length || 0,
    pending: data?.filter((a: any) => a.status === "pending").length || 0,
    booked: data?.filter((a: any) => a.status === "booked").length || 0,
    confirmed: data?.filter((a: any) => a.status === "confirmed").length || 0,
    cancelled: data?.filter((a: any) => a.status === "cancelled").length || 0,
    completed: data?.filter((a: any) => a.status === "completed").length || 0,
  };

  return { ok: true, stats };
}

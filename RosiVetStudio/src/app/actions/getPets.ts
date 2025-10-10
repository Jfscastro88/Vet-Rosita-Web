"use server";

import { createClient } from "@supabase/supabase-js";

export type Pet = {
  id: string;
  name: string;
  type: string;
  age_years?: number;
  owner_email: string;
  owner_name: string;
  created_at: string;
  updated_at: string;
  total_appointments?: number;
  last_appointment?: string;
};

export type PetFilters = {
  search?: string;
  animal_type?: string;
  sort_by?: "name" | "type" | "age" | "owner" | "created_at";
  sort_order?: "asc" | "desc";
};

export async function getPets(filters: PetFilters = {}) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(url, anon);

  let query = supabase.from("animals").select(`
      id,
      name,
      type,
      age_years,
      created_at,
      clients!inner(
        email,
        first_name,
        last_name
      )
    `);

  // Apply filters
  if (filters.animal_type) {
    query = query.eq("type", filters.animal_type);
  }

  // Apply search filter
  if (filters.search) {
    const searchTerm = `%${filters.search}%`;
    query = query.or(
      `name.ilike.${searchTerm},type.ilike.${searchTerm},clients.first_name.ilike.${searchTerm},clients.last_name.ilike.${searchTerm},clients.email.ilike.${searchTerm}`
    );
  }

  // Apply sorting
  const sortBy = filters.sort_by || "name";
  const sortOrder = filters.sort_order || "asc";

  if (sortBy === "name") {
    query = query.order("name", { ascending: sortOrder === "asc" });
  } else if (sortBy === "type") {
    query = query.order("type", { ascending: sortOrder === "asc" });
  } else if (sortBy === "age") {
    query = query.order("age_years", { ascending: sortOrder === "asc" });
  } else if (sortBy === "owner") {
    query = query.order("clients.first_name", { ascending: sortOrder === "asc" });
  } else if (sortBy === "created_at") {
    query = query.order("created_at", { ascending: sortOrder === "asc" });
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching pets:", error);
    return { ok: false, error: error.message, data: [] };
  }

  // Transform the joined data to match the expected Pet interface
  const transformedData =
    data?.map((animal: any) => ({
      id: animal.id,
      name: animal.name,
      type: animal.type,
      age_years: animal.age_years,
      owner_email: animal.clients.email,
      owner_name: `${animal.clients.first_name} ${animal.clients.last_name}`,
      created_at: animal.created_at,
      updated_at: animal.created_at, // animals table doesn't have updated_at, using created_at
    })) || [];

  // If no pets found in animals table, return empty with helpful message
  if (!transformedData || transformedData.length === 0) {
    console.log(
      "No pets found in animals table. This might be due to missing data or RLS policies."
    );

    // Check if there are any appointments that might indicate missing data
    const { count: appointmentCount } = await supabase
      .from("appointments")
      .select("*", { count: "exact", head: true });

    if (appointmentCount && appointmentCount > 0) {
      console.log(
        `Found ${appointmentCount} appointments but no animals data. This suggests a data integrity issue.`
      );
    }

    // Since animals and clients tables are empty, we can't extract pet data
    // This is a data integrity issue that needs to be resolved by populating the tables
    console.log("Cannot extract pet data: animals and clients tables are empty");

    // Try time_slots table (this table doesn't have animal data, so skip this fallback)
    // The time_slots table only contains time slot information, not animal data
  }

  return { ok: true, data: transformedData as Pet[] };
}

export async function getPetStats() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(url, anon);

  // Try animals table first
  const { data: petsData, error: petsError } = await supabase.from("animals").select("id, type");

  if (petsError) {
    console.error("Error fetching pet stats from animals table:", petsError);
  }

  // If no pets data, try to count from appointments/time_slots
  if (!petsData || petsData.length === 0) {
    console.log("No pets found, checking appointments/time_slots for pet count...");

    // Since animals and clients tables are empty, we can't get stats
    console.log("Cannot get pet stats: animals and clients tables are empty");

    // time_slots table doesn't contain animal data, so skip this fallback

    return { ok: true, stats: { total: 0, by_type: {} } };
  }

  // Count by type from pets table
  const typeCounts = petsData.reduce((acc, pet) => {
    acc[pet.type] = (acc[pet.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    ok: true,
    stats: {
      total: petsData.length,
      by_type: typeCounts,
    },
  };
}

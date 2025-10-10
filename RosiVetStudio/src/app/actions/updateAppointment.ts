"use server";

import { createClient } from "@supabase/supabase-js";

export type UpdateAppointmentInput = {
  appointmentId: string;
  status?: "pending" | "booked" | "confirmed" | "cancelled" | "completed";
  // notes?: string; // Removed - notes column doesn't exist in appointments table
};

export async function updateAppointment(input: UpdateAppointmentInput) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(url, anon);

  const updateData: any = {
    // updated_at: new Date().toISOString(), // Removed - updated_at column doesn't exist
  };

  if (input.status) {
    updateData.status = input.status;
  }

  // Removed notes handling - notes column doesn't exist in appointments table
  // if (input.notes !== undefined) {
  //   updateData.notes = input.notes;
  // }

  const { data, error } = await supabase
    .from("appointments")
    .update(updateData)
    .eq("id", input.appointmentId)
    .select()
    .single();

  if (error) {
    console.error("Error updating appointment:", error);
    return { ok: false, error: error.message };
  }

  return { ok: true, data };
}

export async function cancelAppointment(appointmentId: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(url, anon);

  try {
    console.log("Cancelling appointment with ID:", appointmentId);

    // First check if the appointment exists
    const { data: existingAppointment, error: fetchError } = await supabase
      .from("appointments")
      .select("id, status")
      .eq("id", appointmentId)
      .single();

    if (fetchError) {
      console.error("Error fetching appointment for cancellation:", fetchError);
      return { ok: false, error: `Appointment not found: ${fetchError.message}` };
    }

    console.log("Found appointment:", existingAppointment);

    // Update appointment status to cancelled
    const { data: appointmentData, error: appointmentError } = await supabase
      .from("appointments")
      .update({
        status: "cancelled",
        // updated_at: new Date().toISOString(), // Removed - updated_at column doesn't exist
      })
      .eq("id", appointmentId)
      .select()
      .single();

    if (appointmentError) {
      console.error("Error updating appointment status:", appointmentError);
      return { ok: false, error: `Failed to update appointment: ${appointmentError.message}` };
    }

    console.log("Successfully cancelled appointment:", appointmentData);
    return { ok: true, data: appointmentData };
  } catch (error) {
    console.error("Unexpected error cancelling appointment:", error);
    return { ok: false, error: `An unexpected error occurred: ${error}` };
  }
}

export async function completeAppointment(appointmentId: string) {
  return updateAppointment({
    appointmentId,
    status: "completed",
  });
}

export async function approveAppointment(appointmentId: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(url, anon);

  try {
    console.log("Approving appointment with ID:", appointmentId);

    // First check if the appointment exists
    const { data: existingAppointment, error: fetchError } = await supabase
      .from("appointments")
      .select("id, status")
      .eq("id", appointmentId)
      .single();

    if (fetchError) {
      console.error("Error fetching appointment for approval:", fetchError);
      return { ok: false, error: `Appointment not found: ${fetchError.message}` };
    }

    console.log("Found appointment:", existingAppointment);

    // Update appointment status to confirmed
    const { data: appointmentData, error: appointmentError } = await supabase
      .from("appointments")
      .update({
        status: "confirmed",
        // updated_at: new Date().toISOString(), // Removed - updated_at column doesn't exist
      })
      .eq("id", appointmentId)
      .select()
      .single();

    if (appointmentError) {
      console.error("Error updating appointment status:", appointmentError);
      return { ok: false, error: `Failed to update appointment: ${appointmentError.message}` };
    }

    console.log("Successfully approved appointment:", appointmentData);
    return { ok: true, data: appointmentData };
  } catch (error) {
    console.error("Unexpected error approving appointment:", error);
    return { ok: false, error: `An unexpected error occurred: ${error}` };
  }
}

export async function rejectAppointment(appointmentId: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(url, anon);

  try {
    console.log("Rejecting appointment with ID:", appointmentId);

    // First check if the appointment exists
    const { data: existingAppointment, error: fetchError } = await supabase
      .from("appointments")
      .select("id, status")
      .eq("id", appointmentId)
      .single();

    if (fetchError) {
      console.error("Error fetching appointment for rejection:", fetchError);
      return { ok: false, error: `Appointment not found: ${fetchError.message}` };
    }

    console.log("Found appointment:", existingAppointment);

    // Update appointment status to cancelled
    const { data: appointmentData, error: appointmentError } = await supabase
      .from("appointments")
      .update({
        status: "cancelled",
        // updated_at: new Date().toISOString(), // Removed - updated_at column doesn't exist
      })
      .eq("id", appointmentId)
      .select()
      .single();

    if (appointmentError) {
      console.error("Error updating appointment status:", appointmentError);
      return { ok: false, error: `Failed to update appointment: ${appointmentError.message}` };
    }

    console.log("Successfully rejected appointment:", appointmentData);
    return { ok: true, data: appointmentData };
  } catch (error) {
    console.error("Unexpected error rejecting appointment:", error);
    return { ok: false, error: `An unexpected error occurred: ${error}` };
  }
}

"use client";

import { useState } from "react";
import { Container, Stack, Title, Text, Alert } from "@mantine/core";
import { IconCheck, IconAlertCircle } from "@tabler/icons-react";
import { SlotPicker } from "@/components/scheduling/SlotPicker";
import { AppointmentForm } from "@/components/scheduling/AppointmentForm";
import { bookAppointment } from "@/app/actions/bookAppointment";

export default function BookPage() {
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSlotSelect = (slotId: string | null) => {
    setSelectedSlotId(slotId);
    setSubmitStatus({ type: null, message: "" });
  };

  const handleFormSubmit = async (formData: {
    firstName: string;
    lastName: string;
    birthDate: string;
    phone: string;
    email: string;
    animalType: string;
    animalName: string;
    animalAge?: number;
    notes?: string;
    medications?: string;
  }) => {
    if (!selectedSlotId) {
      setSubmitStatus({
        type: "error",
        message: "Seleziona prima un orario disponibile",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const result = await bookAppointment({
        slotId: selectedSlotId,
        ...formData,
      });

      if (result.ok) {
        setSubmitStatus({
          type: "success",
          message: "Appuntamento confermato!",
        });
        // Reset form and slot selection
        setSelectedSlotId(null);
        // Trigger refresh of available slots
        setRefreshTrigger((prev) => prev + 1);
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "Errore durante la prenotazione",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Errore di connessione. Riprova più tardi.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container size="xl" py="xl" className="min-h-screen flex items-center justify-center">
      <Stack gap="xl" className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Prenota una visita</h1>
          <h3 className="text-lg text-gray-600 max-w-2xl mx-auto text-center">
            Seleziona la data e l'orario che preferisci per la visita del tuo animale domestico.
            Compila il modulo con i tuoi dati e quelli del tuo pet.
          </h3>
        </div>

        {/* Status messages */}
        {submitStatus.type && (
          <Alert
            icon={
              submitStatus.type === "success" ? (
                <IconCheck size={16} />
              ) : (
                <IconAlertCircle size={16} />
              )
            }
            color={submitStatus.type === "success" ? "green" : "red"}
            title={submitStatus.type === "success" ? "Prenotazione confermata!" : "Errore"}
            className="mx-auto max-w-2xl"
          >
            {submitStatus.message}
          </Alert>
        )}

        {/* Slot Picker */}
        <SlotPicker
          selectedSlotId={selectedSlotId}
          onSlotSelect={handleSlotSelect}
          refreshTrigger={refreshTrigger}
        />

        {/* Appointment Form */}
        <AppointmentForm
          slotId={selectedSlotId}
          onSubmit={handleFormSubmit}
          loading={isSubmitting}
        />

        {/* Additional info */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-2xl mx-auto text-center">
          <Title order={4} size="h4" className="mb-3">
            Informazioni importanti
          </Title>
          <Stack gap="sm">
            <Text size="sm">• Arriva 10 minuti prima dell'orario prenotato</Text>
            <Text size="sm">• Porta con te la documentazione sanitaria del tuo animale</Text>
            <Text size="sm">• Per annullamenti o modifiche, contattaci almeno 24 ore prima</Text>
            <Text size="sm">
              • In caso di emergenza, chiama il numero di emergenza: +39 333 123 4567
            </Text>
          </Stack>
        </div>
      </Stack>
    </Container>
  );
}

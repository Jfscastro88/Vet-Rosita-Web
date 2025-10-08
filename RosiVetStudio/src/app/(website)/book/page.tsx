"use client";

import { useState, Suspense } from "react";
import { SlotPicker } from "@/components/scheduling/SlotPicker";
import { AppointmentForm } from "@/components/scheduling/AppointmentForm";
import { bookAppointment } from "@/app/actions/bookAppointment";

import {
  Badge,
  Box,
  Button,
  Card,
  Center,
  Container,
  Divider,
  Group,
  LoadingOverlay,
  Paper,
  rem,
  Stepper,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { CalendarCheck, Clock3, Info } from "lucide-react";

type PickedSlot = { id: string; date: string; time: string } | null;

export default function PrenotaPage() {
  const [pickedSlot, setPickedSlot] = useState<PickedSlot>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 992px)");

  const handleSubmit = async (values: any) => {
    if (!pickedSlot?.id) {
      notifications.show({
        title: "Seleziona una disponibilità",
        message: "Per favore scegli data e orario prima di inviare.",
        color: "yellow",
        icon: <Info size={16} />,
      });
      setActiveStep(0);
      return;
    }

    setSubmitting(true);
    const id = notifications.show({
      title: "Invio in corso…",
      message: "Stiamo inviando la tua richiesta di appuntamento.",
      loading: true,
      autoClose: false,
      withCloseButton: false,
    });

    try {
      const res = await bookAppointment({ slotId: pickedSlot.id, ...values } as any);

      if (res?.ok) {
        notifications.update({
          id,
          title: "Richiesta inviata!",
          message: "Ti contatteremo per la conferma a breve.",
          color: "teal",
          loading: false,
          autoClose: 3500,
        });
        setActiveStep(2);
      } else {
        notifications.update({
          id,
          title: "Errore",
          message: res?.error || "Si è verificato un errore. Riprova più tardi.",
          color: "red",
          loading: false,
          autoClose: 4000,
        });
      }
    } catch (e) {
      notifications.update({
        id,
        title: "Errore di rete",
        message: "Controlla la connessione o riprova tra poco.",
        color: "red",
        loading: false,
        autoClose: 4000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-white to-slate-50 min-h-[calc(100dvh-64px)]">
      <Container size="lg" className="py-8">
        {/* Header */}
        <div className="mb-6">
          <Title order={1} className="!text-3xl md:!text-4xl font-bold tracking-tight">
            Prenota una visita
          </Title>
          <Text c="dimmed" className="mt-1">
            Seleziona data e orario disponibili, poi inserisci i tuoi dati.
          </Text>
        </div>

        {/* Stepper */}
        <Paper shadow="sm" className="rounded-2xl p-4 md:p-6 border border-slate-200">
          <Stepper active={activeStep} onStepClick={setActiveStep} allowNextStepsSelect={false}>
            <Stepper.Step
              label="Disponibilità"
              description="Scegli giorno e ora"
              icon={<Clock3 size={16} />}
            >
              <div className={isDesktop ? "grid grid-cols-12 gap-4 md:gap-6" : "space-y-4"}>
                {/* Picker */}
                <Card
                  withBorder
                  padding="lg"
                  className={isDesktop ? "col-span-8 rounded-2xl" : "rounded-2xl"}
                >
                  <Text fw={600} className="mb-2">
                    Calendario disponibilità
                  </Text>
                  <Divider mb="md" />
                  <Suspense
                    fallback={
                      <Box className="space-y-3">
                        <div className="h-10 w-56 bg-slate-200/70 animate-pulse rounded-lg" />
                        <div className="h-64 w-full bg-slate-200/70 animate-pulse rounded-xl" />
                        <div className="h-8 w-40 bg-slate-200/70 animate-pulse rounded-md" />
                      </Box>
                    }
                  >
                    <SlotPicker
                      onPick={(slot: any) => {
                        setPickedSlot(slot);
                      }}
                    />
                  </Suspense>

                  <Group justify="space-between" mt="lg">
                    <Text size="sm" c="dimmed">
                      Seleziona uno slot per continuare.
                    </Text>
                    <Button
                      onClick={() => setActiveStep(1)}
                      disabled={!pickedSlot}
                      radius="xl"
                      variant="filled"
                    >
                      Continua
                    </Button>
                  </Group>
                </Card>

                {/* Sticky slot summary */}
                <div className={isDesktop ? "col-span-4" : ""}>
                  <Card withBorder padding="lg" className="rounded-2xl sticky top-[88px]">
                    <Group justify="space-between" mb="xs">
                      <Text fw={600}>Riepilogo</Text>
                      <Badge
                        variant={pickedSlot ? "filled" : "light"}
                        color={pickedSlot ? "teal" : "gray"}
                      >
                        {pickedSlot ? "Slot selezionato" : "In attesa"}
                      </Badge>
                    </Group>
                    <Divider mb="sm" />
                    {pickedSlot ? (
                      <Group gap="xs">
                        <ThemeIcon variant="light" size="lg" radius="md">
                          <CalendarCheck size={18} />
                        </ThemeIcon>
                        <div>
                          <Text>{pickedSlot.date}</Text>
                          <Text size="sm" c="dimmed">
                            {pickedSlot.time}
                          </Text>
                        </div>
                      </Group>
                    ) : (
                      <Text size="sm" c="dimmed">
                        Nessuno slot selezionato.
                      </Text>
                    )}
                    <Button
                      mt="md"
                      variant="light"
                      radius="xl"
                      onClick={() => setActiveStep(0)}
                      disabled={!pickedSlot}
                    >
                      Cambia slot
                    </Button>
                  </Card>
                </div>
              </div>
            </Stepper.Step>

            <Stepper.Step
              label="Dati"
              description="Inserisci le informazioni"
              icon={<Info size={16} />}
            >
              <Card withBorder padding="lg" className="rounded-2xl relative">
                <LoadingOverlay visible={submitting} zIndex={1000} overlayProps={{ blur: 2 }} />
                <Group justify="space-between" mb="xs">
                  <Text fw={600}>Dati e conferma</Text>
                  {pickedSlot && (
                    <Badge variant="light" color="teal">
                      {pickedSlot.date} · {pickedSlot.time}
                    </Badge>
                  )}
                </Group>
                <Divider mb="md" />

                {/* Keep your existing form component – it already maps fields */}
                <AppointmentForm
                  slotId={pickedSlot?.id ?? null}
                  loading={submitting}
                  onSubmit={handleSubmit}
                />

                <Group mt="md" justify="space-between">
                  <Button variant="default" radius="xl" onClick={() => setActiveStep(0)}>
                    Indietro
                  </Button>
                  <Button type="submit" form="appointment-form" radius="xl" loading={submitting}>
                    Invia richiesta
                  </Button>
                </Group>
              </Card>
            </Stepper.Step>

            <Stepper.Completed>
              <Card withBorder padding="xl" className="rounded-2xl">
                <Center className="flex-col text-center space-y-2">
                  <ThemeIcon size={56} radius="xl" variant="light" color="teal">
                    <CalendarCheck size={28} />
                  </ThemeIcon>
                  <Title order={3} className="mt-2">
                    Richiesta inviata!
                  </Title>
                  <Text c="dimmed" className="max-w-prose">
                    Ti contatteremo per confermare l&apos;appuntamento. Grazie!
                  </Text>
                  <Divider my="md" />
                  <Group>
                    <Button variant="light" radius="xl" onClick={() => setActiveStep(0)}>
                      Prenota un altro
                    </Button>
                    <Button
                      radius="xl"
                      onClick={() => {
                        // As a junior I usually just reload to reset, but you could reset state instead:
                        setPickedSlot(null);
                        setActiveStep(0);
                      }}
                    >
                      Torna alle disponibilità
                    </Button>
                  </Group>
                </Center>
              </Card>
            </Stepper.Completed>
          </Stepper>
        </Paper>

        {/* Little footer hint */}
        <Card withBorder className="mt-6 rounded-2xl">
          <Group p="md" justify="space-between">
            <Text size="sm" c="dimmed">
              Hai dubbi? Scrivici e saremo felici di aiutarti.
            </Text>
            <Button variant="subtle" radius="xl">
              Contattaci
            </Button>
          </Group>
        </Card>
      </Container>
    </div>
  );
}

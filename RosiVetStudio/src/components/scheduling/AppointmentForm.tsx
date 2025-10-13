"use client";

import { useMemo } from "react";
import { useForm } from "@mantine/form";
import {
  Button,
  Divider,
  Fieldset,
  Grid,
  GridCol,
  NumberInput,
  Select,
  Stack,
  Switch,
  TextInput,
  Textarea,
  Paper,
  Title,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconUser, IconCalendar, IconMail, IconPhone, IconDog } from "@tabler/icons-react";
import type { BookingFormData } from "@/lib/schemas";
import { bookingSchema } from "@/lib/schemas";

export type Props = {
  slotId: string | null;
  onSubmit: (parsed: {
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
  }) => Promise<void>;
  loading?: boolean;
};

export function AppointmentForm({ slotId, onSubmit, loading }: Props) {
  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const limited = cleaned.slice(0, 10);

    if (limited.length <= 3) {
      return limited;
    } else if (limited.length <= 6) {
      return `${limited.slice(0, 3)} ${limited.slice(3)}`;
    } else {
      return `${limited.slice(0, 3)} ${limited.slice(3, 6)} ${limited.slice(6)}`;
    }
  };

  const form = useForm<BookingFormData>({
    validate: (values) => {
      try {
        bookingSchema.parse(values);
        return {};
      } catch (error: any) {
        const errors: Record<string, string> = {};
        if (error.errors) {
          error.errors.forEach((err: any) => {
            if (err.path && err.path.length > 0) {
              errors[err.path[0]] = err.message;
            }
          });
        }
        return errors;
      }
    },
    initialValues: {
      nome: "",
      cognome: "",
      dataNascita: new Date(),
      sesso: undefined,
      telefono: "",
      email: "",
      confermaEmail: "",
      tipoAnimale: "",
      nomeAnimale: "",
      etaAnimale: undefined,
      infoParticolari: "",
      farmaci: "",
      consensoGdpr: false,
    },
    validateInputOnBlur: true,
    validateInputOnChange: false,
  });

  const canSubmit = useMemo(() => {
    const hasSlot = Boolean(slotId);
    if (!hasSlot) return false;

    // Only validate required fields that have been touched or filled
    const requiredFields = [
      "nome",
      "cognome",
      "telefono",
      "email",
      "confermaEmail",
      "tipoAnimale",
      "nomeAnimale",
      "consensoGdpr",
    ];
    const hasAllRequired = requiredFields.every((field) => {
      const value = form.values[field as keyof typeof form.values];
      return value && (typeof value === "string" ? value.trim() : value);
    });

    return hasAllRequired;
  }, [slotId, form.values]);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <Paper withBorder shadow="sm" p="lg" className="bg-white rounded-2xl">
        <Stack gap="lg">
          <div className="flex items-center justify-between">
            <Title order={3} className="flex items-center gap-2">
              <IconDog size={20} /> Prenotazione visita
            </Title>
            {!slotId && (
              <span className="text-sm text-amber-700 bg-amber-50 border border-amber-300 rounded-full px-3 py-1">
                Seleziona prima data e orario
              </span>
            )}
          </div>

          <form
            onSubmit={form.onSubmit(async (vals) => {
              if (!slotId) {
                form.setErrors({ nome: "Seleziona prima data e orario nella sezione sopra" });
                return;
              }

              if (vals.email !== vals.confermaEmail) {
                form.setErrors({ confermaEmail: "Le email non coincidono" });
                return;
              }
              if (!vals.consensoGdpr) {
                form.setErrors({ consensoGdpr: "Necessario per continuare" });
                return;
              }

              const parsed = {
                firstName: vals.nome,
                lastName: vals.cognome,
                birthDate: vals.dataNascita
                  ? new Date(vals.dataNascita).toISOString().slice(0, 10)
                  : "",
                phone: vals.telefono,
                email: vals.email,
                animalType: vals.tipoAnimale,
                animalName: vals.nomeAnimale,
                animalAge: vals.etaAnimale ?? undefined,
                notes: vals.infoParticolari || undefined,
                medications: vals.farmaci || undefined,
              } as const;

              await onSubmit(parsed);
            })}
            noValidate
          >
            <Stack gap="xl">
              {/* === Dati personali === */}
              <Fieldset legend="Dati personali" className="rounded-2xl" radius="lg">
                <Grid gutter="sm">
                  <GridCol span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Nome"
                      required
                      withAsterisk
                      leftSection={<IconUser size={16} />}
                      placeholder="Nome"
                      {...form.getInputProps("nome")}
                    />
                  </GridCol>
                  <GridCol span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Cognome"
                      required
                      withAsterisk
                      placeholder="Cognome"
                      {...form.getInputProps("cognome")}
                    />
                  </GridCol>

                  <GridCol span={{ base: 12, sm: 4 }}>
                    <DatePickerInput
                      label="Data di nascita"
                      required
                      withAsterisk
                      valueFormat="DD/MM/YYYY"
                      leftSection={<IconCalendar size={16} />}
                      popoverProps={{ withinPortal: true }}
                      placeholder="Seleziona data"
                      {...form.getInputProps("dataNascita")}
                    />
                  </GridCol>

                  <GridCol span={{ base: 12, sm: 4 }}>
                    <Select
                      label="Sesso"
                      placeholder="Seleziona"
                      data={[
                        { value: "f", label: "Femminile" },
                        { value: "m", label: "Maschile" },
                        { value: "ncb", label: "Non binario / Altro" },
                        { value: "npd", label: "Preferisco non dirlo" },
                      ]}
                      {...form.getInputProps("sesso")}
                    />
                  </GridCol>

                  <GridCol span={{ base: 12, sm: 4 }}>
                    <TextInput
                      label="Telefono"
                      required
                      withAsterisk
                      leftSection={<IconPhone size={16} />}
                      placeholder="333 123 4567"
                      inputMode="tel"
                      maxLength={13}
                      value={form.values.telefono}
                      onChange={(event) => {
                        const formatted = formatPhoneNumber(event.target.value);
                        form.setFieldValue("telefono", formatted);
                      }}
                      error={form.errors.telefono}
                    />
                  </GridCol>

                  <GridCol span={{ base: 12, sm: 6 }}>
                    <TextInput
                      type="email"
                      label="Email"
                      required
                      withAsterisk
                      leftSection={<IconMail size={16} />}
                      placeholder="nome@email.com"
                      {...form.getInputProps("email")}
                    />
                  </GridCol>
                  <GridCol span={{ base: 12, sm: 6 }}>
                    <TextInput
                      type="email"
                      label="Conferma email"
                      required
                      withAsterisk
                      placeholder="Ripeti email"
                      {...form.getInputProps("confermaEmail")}
                    />
                  </GridCol>
                </Grid>
              </Fieldset>

              {/* === Dati dell'animale === */}
              <Fieldset legend="Dati dell’animale" className="rounded-2xl" radius="lg">
                <Grid gutter="sm">
                  <GridCol span={{ base: 12, sm: 6 }}>
                    <Select
                      label="Tipo di animale"
                      required
                      withAsterisk
                      leftSection={<IconDog size={16} />}
                      placeholder="Seleziona"
                      data={[
                        { value: "Cane", label: "Cane" },
                        { value: "Gatto", label: "Gatto" },
                        { value: "Uccello", label: "Uccello" },
                        { value: "Rettili", label: "Rettili" },
                        { value: "Roditore", label: "Roditore" },
                        { value: "Altro", label: "Altro" },
                      ]}
                      {...form.getInputProps("tipoAnimale")}
                    />
                  </GridCol>

                  <GridCol span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Nome dell’animale"
                      required
                      withAsterisk
                      placeholder="Fuffy"
                      {...form.getInputProps("nomeAnimale")}
                    />
                  </GridCol>

                  <GridCol span={{ base: 12, sm: 6 }}>
                    <NumberInput
                      label="Età (anni)"
                      min={0}
                      allowDecimal={false}
                      clampBehavior="strict"
                      placeholder="es. 3"
                      {...form.getInputProps("etaAnimale")}
                    />
                  </GridCol>

                  <GridCol span={{ base: 12 }}>
                    <Textarea
                      label="Informazioni particolari (opzionale)"
                      autosize
                      minRows={2}
                      placeholder="allergie, patologie, comportamenti, ecc."
                      {...form.getInputProps("infoParticolari")}
                    />
                  </GridCol>

                  <GridCol span={{ base: 12 }}>
                    <Textarea
                      label="Farmaci / trattamenti in corso (opzionale)"
                      autosize
                      minRows={2}
                      placeholder="farmaci e dosaggi, terapie..."
                      {...form.getInputProps("farmaci")}
                    />
                  </GridCol>
                </Grid>
              </Fieldset>

              {/* === Consensi === */}
              <Fieldset legend="Consensi" className="rounded-2xl" radius="lg">
                <Stack gap="sm">
                  <Switch
                    label="Acconsento al trattamento dei dati personali (GDPR)"
                    {...form.getInputProps("consensoGdpr", { type: "checkbox" })}
                  />
                </Stack>
              </Fieldset>

              <Divider />

              <Button
                type="submit"
                size="md"
                radius="xl"
                fullWidth
                disabled={!canSubmit}
                loading={!!loading}
              >
                Conferma appuntamento
              </Button>

              {/* SR/inline error */}
              {Object.values(form.errors).length > 0 && (
                <div aria-live="polite" className="text-sm text-red-600">
                  {Object.values(form.errors)[0]}
                </div>
              )}
            </Stack>
          </form>
        </Stack>
      </Paper>
    </div>
  );
}

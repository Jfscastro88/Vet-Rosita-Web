"use client";

import { useForm } from "@mantine/form";
import {
  Button,
  Checkbox,
  Divider,
  NumberInput,
  Select,
  Stack,
  TextInput,
  Textarea,
  Group,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { BookingFormData } from "@/lib/schemas";

type Props = {
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
  const form = useForm<BookingFormData>({
    validate: (values) => {
      const errors: Record<string, string> = {};

      // Validate required fields
      if (!values.nome.trim()) errors.nome = "Obbligatorio";
      if (!values.cognome.trim()) errors.cognome = "Obbligatorio";
      if (!values.telefono.trim()) errors.telefono = "Inserisci un numero valido";
      if (!values.email.trim()) errors.email = "Email non valida";
      if (!values.confermaEmail.trim()) errors.confermaEmail = "Email non valida";
      if (!values.tipoAnimale.trim()) errors.tipoAnimale = "Obbligatorio";
      if (!values.nomeAnimale.trim()) errors.nomeAnimale = "Obbligatorio";

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (values.email && !emailRegex.test(values.email)) {
        errors.email = "Email non valida";
      }
      if (values.confermaEmail && !emailRegex.test(values.confermaEmail)) {
        errors.confermaEmail = "Email non valida";
      }

      // Validate phone number length
      if (values.telefono && values.telefono.length < 6) {
        errors.telefono = "Inserisci un numero valido";
      }

      // Validate email confirmation
      if (values.email && values.confermaEmail && values.email !== values.confermaEmail) {
        errors.confermaEmail = "Le email non coincidono";
      }

      // Validate GDPR consent
      if (!values.consensoGdpr) {
        errors.consensoGdpr = "Necessario per continuare";
      }

      return errors;
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
  });

  return (
    <form
      onSubmit={form.onSubmit(async (vals) => {
        if (!slotId) {
          form.setErrors({ nome: "Seleziona prima data e orario nella sezione sopra" });
          return;
        }

        // Validate email confirmation
        if (vals.email !== vals.confermaEmail) {
          form.setErrors({ confermaEmail: "Le email non coincidono" });
          return;
        }

        // Validate GDPR consent
        if (!vals.consensoGdpr) {
          form.setErrors({ consensoGdpr: "Necessario per continuare" });
          return;
        }
        // adapta para o schema do server action (inglês)
        const parsed = {
          firstName: vals.nome,
          lastName: vals.cognome,
          birthDate: vals.dataNascita
            ? new Date(vals.dataNascita).toISOString().slice(0, 10) // yyyy-mm-dd
            : "",
          phone: vals.telefono,
          email: vals.email,
          animalType: vals.tipoAnimale,
          animalName: vals.nomeAnimale,
          animalAge: vals.etaAnimale ?? undefined,
          notes: vals.infoParticolari || undefined,
          medications: vals.farmaci || undefined,
        };
        await onSubmit(parsed);
      })}
      noValidate
    >
      <Stack gap="sm">
        {/* Persona */}
        <TextInput label="Nome" required withAsterisk {...form.getInputProps("nome")} />
        <TextInput label="Cognome" required withAsterisk {...form.getInputProps("cognome")} />

        <DatePickerInput
          label="Data di nascita"
          required
          withAsterisk
          valueFormat="DD/MM/YYYY"
          popoverProps={{ withinPortal: true }}
          {...form.getInputProps("dataNascita")}
        />

        <Select
          label="Sesso"
          data={[
            { value: "f", label: "Femminile" },
            { value: "m", label: "Maschile" },
            { value: "ncb", label: "Non binario / Altro" },
            { value: "npd", label: "Preferisco non dirlo" },
          ]}
          {...form.getInputProps("sesso")}
        />

        <Group grow>
          <TextInput label="Telefono" required withAsterisk {...form.getInputProps("telefono")} />
          <TextInput
            type="email"
            label="Email"
            required
            withAsterisk
            {...form.getInputProps("email")}
          />
        </Group>

        <TextInput
          type="email"
          label="Conferma email"
          required
          withAsterisk
          {...form.getInputProps("confermaEmail")}
        />

        <Divider my="xs" label="Dati dell’animale" labelPosition="center" />

        {/* Animale */}
        <Select
          label="Tipo di animale"
          required
          withAsterisk
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

        <Group grow>
          <TextInput
            label="Nome dell’animale"
            required
            withAsterisk
            {...form.getInputProps("nomeAnimale")}
          />
          <NumberInput
            label="Età (anni)"
            min={0}
            allowDecimal={false}
            {...form.getInputProps("etaAnimale")}
          />
        </Group>

        <Textarea
          label="Informazioni particolari"
          autosize
          minRows={2}
          {...form.getInputProps("infoParticolari")}
        />
        <Textarea
          label="Farmaci / trattamenti in corso"
          autosize
          minRows={2}
          {...form.getInputProps("farmaci")}
        />

        <Checkbox
          label="Acconsento al trattamento dei dati personali (GDPR)"
          {...form.getInputProps("consensoGdpr", { type: "checkbox" })}
        />

        <Button
          type="submit"
          variant="filled"
          color="rgba(63, 140, 133, 1)"
          radius="xl"
          loading={!!loading}
        >
          Conferma appuntamento
        </Button>

        {/* Extras opcionais, deixa como no teu exemplo */}
        {/* <Divider label="oppure" labelPosition="center" my="xs" /> */}
        {/* <GoogleButton onClick={() => alert("Entrar con Google (demo)")} /> */}

        {/* <div className="text-sm text-center mt-2">
          <Link href="/login" className="text-blue-600 hover:underline">
            già registrato? accedi
          </Link>
        </div> */}
      </Stack>
    </form>
  );
}

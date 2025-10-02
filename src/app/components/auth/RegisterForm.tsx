"use client";

import { Stack, TextInput, PasswordInput, Select, Button, Divider } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import Link from "next/link";
import GoogleButton from "@/app/components/auth/GoogleButton";
import { registerSchema, type RegisterValues } from "@/lib/validators/auth";
import { mantineZodResolver } from "@/lib/validators/mantineZodResolver";

type RegisterFormValues = Omit<RegisterValues, "dataNascita"> & {
  dataNascita: Date | null;
};

export default function RegisterForm({ onSubmit }: { onSubmit: (values: RegisterValues) => void }) {
  const form = useForm<RegisterFormValues>({
    initialValues: {
      nome: "",
      cognome: "",
      dataNascita: null,
      sesso: "npd",
      email: "",
      confermaEmail: "",
      password: "",
    },
    validate: mantineZodResolver(registerSchema),
  });

  return (
    <form
      onSubmit={form.onSubmit((vals) => {
        const parsed = registerSchema.parse(vals as any);
        onSubmit(parsed);
      })}
      noValidate
    >
      <Stack gap="sm">
        <TextInput label="Nome" required withAsterisk {...form.getInputProps("nome")} />
        <TextInput label="Cognome" required withAsterisk {...form.getInputProps("cognome")} />

        <DatePickerInput
          label="Data di nascita"
          required
          withAsterisk
          valueFormat="DD/MM/YYYY"
          popoverProps={{ withinPortal: true }}
          value={form.values.dataNascita}
          onChange={(d) => form.setFieldValue("dataNascita", d as Date | null)}
          error={form.errors.dataNascita}
        />

        <Select
          label="Sesso"
          required
          withAsterisk
          data={[
            { value: "f", label: "Femminile" },
            { value: "m", label: "Maschile" },
            { value: "ncb", label: "Non binario / Altro" },
            { value: "npd", label: "Preferisco non dirlo" },
          ]}
          {...form.getInputProps("sesso")}
        />

        <TextInput
          type="email"
          label="Email"
          required
          withAsterisk
          {...form.getInputProps("email")}
        />
        <TextInput
          type="email"
          label="Conferma email"
          required
          withAsterisk
          {...form.getInputProps("confermaEmail")}
        />
        <PasswordInput label="Password" required withAsterisk {...form.getInputProps("password")} />

        <Button type="submit" variant="filled" color="rgba(63, 140, 133, 1)" radius="xl">
          Registrati
        </Button>

        <Divider label="oppure" labelPosition="center" my="xs" />
        <GoogleButton onClick={() => alert("Entrar con Google (demo)")} />

        <div className="text-sm text-center mt-2">
          <Link href="/login" className="text-blue-600 hover:underline">
            già registrato? accedi
          </Link>
        </div>
      </Stack>
    </form>
  );
}

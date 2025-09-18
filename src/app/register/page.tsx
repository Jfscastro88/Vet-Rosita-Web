// app/register/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import {
    Button,
    Card,
    Select,
    Stack,
    TextInput,
    PasswordInput,
    Title,
    Divider,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";

// Types for the form to keep Date optional (undefined by default)
type FormValues = {
    nome: string;
    cognome: string;
    dataNascita?: Date | undefined;
    email: string;
    confermaEmail: string;
    password: string;
    sesso: string;
};

export default function RegisterPage() {
    const form = useForm<FormValues>({
        initialValues: {
            nome: "",
            cognome: "",
            dataNascita: undefined as Date | undefined,
            email: "",
            confermaEmail: "",
            password: "",
            sesso: "",
        },
        validate: {
            nome: (v) => (!!v ? null : "Nome obbligatorio"),
            cognome: (v) => (!!v ? null : "Cognome obbligatorio"),
            dataNascita: (v) => (v ? null : "Data di nascita obbligatoria"),
            email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : "Email non valida"),
            confermaEmail: (v, values) => (v === values.email ? null : "Le email non coincidono"),
            password: (v) =>
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}\[\]:;"'<>,.?/]).{8,}$/.test(v)
            ? null
            : "La password deve contenere almeno 8 caratteri, una maiuscola, una minuscola, un numero e un simbolo",
            sesso: (v) => (!!v ? null : "Seleziona il sesso"),
        },
    });
    
    function onSubmit(values: FormValues) {
        // TODO: integra con Supabase/tuo backend
        console.log("Register values", values);
        alert("Registrazione inviata (demo)");
    }
    
    return (
        <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center p-4">
        <Card shadow="sm" padding="xl" radius="lg" withBorder className="w-full max-w-md">
        <Stack gap="md">
        <Title order={2} ta="center">
        Registrazione
        </Title>
        
        <form onSubmit={form.onSubmit(onSubmit)} noValidate>
        <Stack gap="sm">
        <TextInput
        label="Nome"
        placeholder="Il tuo nome"
        required
        withAsterisk
        autoComplete="given-name"
        {...form.getInputProps("nome")}
        />
        
        <TextInput
        label="Cognome"
        placeholder="Il tuo cognome"
        required
        withAsterisk
        autoComplete="family-name"
        {...form.getInputProps("cognome")}
        />
        
        <DatePickerInput
        label="Data di nascita"
        placeholder="Seleziona la data"
        required
        withAsterisk
        valueFormat="DD/MM/YYYY"
        popoverProps={{ withinPortal: true }}
        value={form.values.dataNascita ?? undefined}
        onChange={(d) => form.setFieldValue("dataNascita", (d as Date | null) ?? undefined)}
        error={form.errors.dataNascita}
        />
        
        <Select
        label="Sesso"
        placeholder="Seleziona"
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
        placeholder="Name@email.com"
        required
        withAsterisk
        autoComplete="email"
        {...form.getInputProps("email")}
        />
        
        <TextInput
        type="email"
        label="Conferma email"
        placeholder="Ripeti la tua email"
        required
        withAsterisk
        autoComplete="email"
        {...form.getInputProps("confermaEmail")}
        />
        
        <PasswordInput
        label="Password"
        placeholder="Crea una password sicura"
        required
        withAsterisk
        autoComplete="new-password"
        {...form.getInputProps("password")}
        />
        
        <Button type="submit" variant="filled" color="rgba(63, 140, 133, 1)" size="md" radius="xl">
        Registrati
        </Button>
        
        <Divider label="oppure" labelPosition="center" my="xs" />
        
        <Button
        variant="default"
        fullWidth
        radius="xl"
        size="md"
        leftSection={
            // Google "G" mark SVG minimal
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.9 32.4 29.4 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 3l5.7-5.7C33.5 6.1 28.9 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16.1 18.9 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C33.5 6.1 28.9 4 24 4 16 4 9 8.5 6.3 14.7z"/>
            <path fill="#4CAF50" d="M24 44c5.3 0 10.2-2 13.9-5.3l-6.4-5.2C29.3 35.5 26.8 36 24 36c-5.3 0-9.8-3.6-11.3-8.5l-6.5 5C9 39.5 16 44 24 44z"/>
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.4-4.2 6-8.3 6-5.3 0-9.8-3.6-11.3-8.5l-6.5 5C9 39.5 16 44 24 44c8 0 15-5.2 17.3-12.5.7-2.1 1.1-4.3 1.1-6.5 0-1.3-.1-2.7-.4-3.5z"/>
            </svg>
        }
        onClick={() => alert("Entrar con Google (demo)")}
        >
        entra con Google
        </Button>
        
        {/* Link sotto il form */}
        <div className="text-sm text-center mt-2">
        <Link href="/login" className="text-blue-600 hover:underline">
        già registrato? accedi
        </Link>
        </div>
        </Stack>
        </form>
        </Stack>
        </Card>
        </div>
    );
}

// --- Dev-only smoke tests (run in browser console, do not affect production) ---
if (process.env.NODE_ENV !== "production") {
    const sample: FormValues = {
        nome: "Anna",
        cognome: "Rossi",
        dataNascita: undefined,
        email: "anna.rossi@example.com",
        confermaEmail: "anna.rossi@example.com",
        password: "Abcdef1!",
        sesso: "f",
    };
    console.assert(sample.password.length >= 8, "[test] Password almeno 8 caratteri");
    console.assert(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}\[\]:;"'<>,.?/])/.test(sample.password), "[test] Password deve contenere maiuscola, minuscola, numero e simbolo");
}

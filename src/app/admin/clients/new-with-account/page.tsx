"use client";

import React from "react";
import Link from "next/link";
import {
    Button,
    Card,
    Group,
    Stack,
    TextInput,
    Title,
    Select,
    Divider,
    Tooltip,
    ActionIcon,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconRefresh } from "@tabler/icons-react";

// ---- Shared helpers ----
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s().-]{6,}$/; // semplice, permissivo

function generateIscrizione(seq: number = 1) {
    const year = new Date().getFullYear();
    return `${year}-${String(seq).padStart(4, "0")}`; // es. 2025-0001
}

// ---- Types ----
type WithAccountValues = {
    iscrizione: string;
    nome: string;
    cognome: string;
    dataNascita?: Date | undefined;
    telefono: string;
    sesso: string;
    email: string;
    confermaEmail: string;
};

export default function NewClientWithAccountPage() {
    const [seq, setSeq] = React.useState(1); // demo: in produzione viene dal DB
    
    const form = useForm<WithAccountValues>({
        initialValues: {
            iscrizione: generateIscrizione(seq),
            nome: "",
            cognome: "",
            dataNascita: undefined,
            telefono: "",
            sesso: "",
            email: "",
            confermaEmail: "",
        },
        validate: {
            iscrizione: (v) => (v ? null : "Numero di iscrizione obbligatorio"),
            nome: (v) => (v ? null : "Nome obbligatorio"),
            cognome: (v) => (v ? null : "Cognome obbligatorio"),
            dataNascita: (v) => (v ? null : "Data di nascita obbligatoria"),
            telefono: (v) => (PHONE_RE.test(v) ? null : "Telefono non valido"),
            sesso: (v) => (v ? null : "Seleziona il sesso"),
            email: (v) => (EMAIL_RE.test(v) ? null : "Email non valida"),
            confermaEmail: (v, values) => (v === values.email ? null : "Le email non coincidono"),
        },
    });
    
    function regenIscrizione() {
        const next = seq + 1;
        setSeq(next);
        form.setFieldValue("iscrizione", generateIscrizione(next));
    }
    
    async function onSubmit(values: WithAccountValues) {
        // ✅ Flusso richiesto:
        // - Iscrizione generata automaticamente per l'anno corrente (univocità va garantita lato DB)
        // - Crea *invito* account: invia email di conferma; l'utente imposta la password dopo
        // TODO (Supabase esempio):
        // await supabase.auth.admin.inviteUserByEmail(values.email, { redirectTo: "https://tua-app.com/auth/callback" })
        // Poi inserisci in `clients` il record con iscrizione/nome/cognome/telefono/sesso/email
        console.log("[new-with-account] submit", values);
        alert("Invito inviato al cliente (demo) e cliente registrato nella tabella");
    }
    
    return (
        <div className="min-h-screen bg-white text-gray-900 p-4 pt-24 sm:pt-28 flex items-start justify-center">
        <Card withBorder radius="lg" shadow="sm" className="w-full max-w-2xl">
        <Stack gap="md">
        <Group justify="space-between" align="center">
        <Title order={2}>Nuovo cliente — con account</Title>
        <Button component={Link} href="/admin/dashboard" variant="subtle">
        ⟵ Torna al dashboard
        </Button>
        </Group>
        
        <form onSubmit={form.onSubmit(onSubmit)} noValidate>
        <Stack gap="sm">
        <Group align="end" wrap="nowrap">
        <TextInput
        label="Numero iscrizione"
        placeholder="es. 2025-0001"
        required withAsterisk
        className="flex-1"
        {...form.getInputProps("iscrizione")}
        readOnly
        />
        <Tooltip label="Rigenera">
        <ActionIcon variant="default" radius="md" onClick={regenIscrizione} aria-label="rigenera iscrizione">
        <IconRefresh size={18} />
        </ActionIcon>
        </Tooltip>
        </Group>
        
        <Group grow>
        <TextInput
        label="Nome"
        placeholder="Il tuo nome"
        required withAsterisk
        autoComplete="given-name"
        {...form.getInputProps("nome")}
        />
        <TextInput
        label="Cognome"
        placeholder="Il tuo cognome"
        required withAsterisk
        autoComplete="family-name"
        {...form.getInputProps("cognome")}
        />
        </Group>
        
        <Group grow>
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
        <TextInput
        label="Telefono"
        placeholder="es. +39 333 111 2222"
        required withAsterisk
        {...form.getInputProps("telefono")}
        />
        </Group>
        
        <Select
        label="Sesso"
        placeholder="Seleziona"
        required withAsterisk
        data={[
            { value: "f", label: "Femminile" },
            { value: "m", label: "Maschile" },
            { value: "ncb", label: "Non binario / altro" },
            { value: "npd", label: "Preferisco non dirlo" },
        ]}
        {...form.getInputProps("sesso")}
        />
        
        <Divider label="Contatto" labelPosition="center" my="xs" />
        
        <Group grow>
        <TextInput
        type="email"
        label="Email"
        placeholder="name@email.com"
        required withAsterisk
        autoComplete="email"
        {...form.getInputProps("email")}
        />
        <TextInput
        type="email"
        label="Conferma email"
        placeholder="ripeti email"
        required withAsterisk
        autoComplete="email"
        {...form.getInputProps("confermaEmail")}
        />
        </Group>
        
        <Group justify="end" mt="sm">
        <Button type="submit">Crea Cliente</Button>
        </Group>
        </Stack>
        </form>
        </Stack>
        </Card>
        </div>
    );
}

// --- Dev-only smoke tests ---
if (process.env.NODE_ENV !== "production") {
    console.assert(EMAIL_RE.test("user@example.com"), "[test] email valida ok");
}


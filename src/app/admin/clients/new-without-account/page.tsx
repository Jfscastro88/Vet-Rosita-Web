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
    Tooltip,
    ActionIcon,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconRefresh } from "@tabler/icons-react";

// ---- Shared helpers ----
const PHONE_RE = /^[+\d][\d\s().-]{6,}$/;
function generateIscrizione(seq: number = 1) {
    const year = new Date().getFullYear();
    return `${year}-${String(seq).padStart(4, "0")}`;
}

// ---- Types ----
type WithoutAccountValues = {
    iscrizione: string;
    nome: string;
    cognome: string;
    dataNascita?: Date | undefined;
    telefono: string;
    sesso: string;
    note?: string;
};

export function NewClientWithoutAccountPage() {
    const [seq, setSeq] = React.useState(1);
    
    const form = useForm<WithoutAccountValues>({
        initialValues: {
            iscrizione: generateIscrizione(seq),
            nome: "",
            cognome: "",
            dataNascita: undefined,
            telefono: "",
            sesso: "",
            note: "",
        },
        validate: {
            iscrizione: (v) => (v ? null : "Numero di iscrizione obbligatorio"),
            nome: (v) => (v ? null : "Nome obbligatorio"),
            cognome: (v) => (v ? null : "Cognome obbligatorio"),
            dataNascita: (v) => (v ? null : "Data di nascita obbligatoria"),
            telefono: (v) => (PHONE_RE.test(v) ? null : "Telefono non valido"),
            sesso: (v) => (v ? null : "Seleziona il sesso"),
        },
    });
    
    function regenIscrizione() {
        const next = seq + 1;
        setSeq(next);
        form.setFieldValue("iscrizione", generateIscrizione(next));
    }
    
    async function onSubmit(values: WithoutAccountValues) {
        // Inserisce record in `clients` senza credenziali auth
        console.log("[new-without-account] submit", values);
        alert("Cliente senza account creato (demo)");
    }
    
    return (
        <div className="min-h-screen bg-white text-gray-900 p-4 pt-24 sm:pt-28 flex items-start justify-center">
        <Card withBorder radius="lg" shadow="sm" className="w-full max-w-2xl">
        <Stack gap="md">
        <Group justify="space-between" align="center">
        <Title order={2}>Nuovo cliente — senza account</Title>
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
        <ActionIcon variant="default" size={35} radius="xl" onClick={regenIscrizione} aria-label="rigenera iscrizione">
        <IconRefresh size={20} />
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
        
        <TextInput
        label="Note (opzionale)"
        placeholder="Annotazioni utili"
        {...form.getInputProps("note")}
        />
        
        <Group justify="end" mt="sm">
        <Button type="submit">Crea cliente</Button>
        </Group>
        </Stack>
        </form>
        </Stack>
        </Card>
        </div>
    );
}

// re-export default to satisfy Next route when saved as separate file
export { NewClientWithoutAccountPage as default };

"use client";

import React from "react";
import { Stack, Group, TextInput, Select, Divider, Button, Tooltip, ActionIcon } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconRefresh } from "@tabler/icons-react";
import { clientAddSchema, type ClientAddValues } from "@/lib/validators/client";
import { mantineZodResolver } from "@/lib/validators/mantineZodResolver";

const PHONE_RE = /^[+\d][\d\s().-]{6,}$/;

function generateIscrizione(seq = 1) {
    const year = new Date().getFullYear();
    return `${year}-${String(seq).padStart(4, "0")}`;
}

type ClientFormValues = Omit<ClientAddValues, "dataNascita" | "email" | "confermaEmail"> & {
    dataNascita: Date | null;
    email?: string;
    confermaEmail?: string;
};

export default function ClientForm({ onSubmit }: { onSubmit: (v: ClientAddValues) => void }) {
    const [seq, setSeq] = React.useState(1);
    
    const form = useForm<ClientFormValues>({
        initialValues: {
            iscrizione: generateIscrizione(seq),
            nome: "",
            cognome: "",
            dataNascita: null,
            telefono: "",
            sesso: "npd",
            email: "",
            confermaEmail: "",
        },
        validate: mantineZodResolver(clientAddSchema),
    });
    
    const regenIscrizione = () => {
        const next = seq + 1;
        setSeq(next);
        form.setFieldValue("iscrizione", generateIscrizione(next));
    };
    
    return (
        <form
        onSubmit={form.onSubmit((vals) => {
            const parsed = clientAddSchema.parse(vals as any);
            onSubmit(parsed);
        })}
        noValidate
        >
        <Stack gap="sm">
        <Group align="end" wrap="nowrap">
        <TextInput
        label="Numero iscrizione"
        readOnly
        required
        withAsterisk
        className="flex-1"
        {...form.getInputProps("iscrizione")}
        />
        <Tooltip label="Rigenera">
        <ActionIcon variant="default" radius="md" onClick={regenIscrizione} aria-label="rigenera iscrizione">
        <IconRefresh size={18} />
        </ActionIcon>
        </Tooltip>
        </Group>
        
        <Group grow>
        <TextInput label="Nome" required withAsterisk {...form.getInputProps("nome")} />
        <TextInput label="Cognome" required withAsterisk {...form.getInputProps("cognome")} />
        </Group>
        <Group grow>
        <DatePickerInput
        label="Data di nascita (opzionale)"
        valueFormat="DD/MM/YYYY"
        popoverProps={{ withinPortal: true }}
        value={form.values.dataNascita}                      
        onChange={(d) => form.setFieldValue("dataNascita", d as Date | null)}
        error={form.errors.dataNascita}
        />
        <TextInput
        label="Telefono"
        placeholder="es. +39 333 111 2222"
        required
        withAsterisk
        {...form.getInputProps("telefono")}
        onBlur={(e) => {
            if (!PHONE_RE.test(e.currentTarget.value)) {
                form.setFieldError("telefono", "Telefono non valido");
            }
        }}
        />
        </Group>
        
        <Select
        label="Sesso"
        required
        withAsterisk
        data={[
            { value: "f", label: "Femminile" },
            { value: "m", label: "Maschile" },
            { value: "ncb", label: "Non binario / altro" },
            { value: "npd", label: "Preferisco non dirlo" },
        ]}
        {...form.getInputProps("sesso")}
        />
        
        <Divider label="Account (opzionale)" labelPosition="center" my="xs" />
        
        <Group grow>
        <TextInput type="email" label="Email" placeholder="(opzionale)" {...form.getInputProps("email")} />
        <TextInput type="email" label="Conferma email" placeholder="(opzionale)" {...form.getInputProps("confermaEmail")} />
        </Group>
        
        <Group justify="end" mt="sm">
        <Button type="submit">Crea cliente</Button>
        </Group>
        </Stack>
        </form>
    );
}
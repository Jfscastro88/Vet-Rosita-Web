"use client";
import React from "react";
import { Button, Group, Select, Stack, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { clientUpdateSchema, type ClientUpdateValues } from "@/lib/validators/client";
import { mantineZodResolver } from "@/lib/validators/mantineZodResolver";
import type { Client } from "@/types/client";
import { IconUserMinus } from "@tabler/icons-react";

type FormValues = Omit<ClientUpdateValues, "dataNascita"> & { dataNascita: Date | null };

export default function ClientEditForm({
    client,
    onSave,
    onDeleteAccount,
}: {
    client: Client;
    onSave: (v: ClientUpdateValues) => void;
    onDeleteAccount?: () => void;
}) {
    const form = useForm<FormValues>({
        initialValues: {
            iscrizione: client.iscrizione,
            nome: client.nome,
            cognome: client.cognome,
            dataNascita: client.dataNascita ?? null,
            telefono: client.telefono,
            sesso: client.sesso,
            email: client.email ?? "",
            hasAccount: client.hasAccount,
        },
        validate: mantineZodResolver(clientUpdateSchema),
    });
    
    React.useEffect(() => {
        form.setValues({
            iscrizione: client.iscrizione,
            nome: client.nome,
            cognome: client.cognome,
            dataNascita: client.dataNascita ?? null,
            telefono: client.telefono,
            sesso: client.sesso,
            email: client.email ?? "",
            hasAccount: client.hasAccount,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [client]);
    
    return (
        <form
        onSubmit={form.onSubmit((vals) => {
            const parsed = clientUpdateSchema.parse(vals as any);
            onSave(parsed);
        })}
        noValidate
        >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextInput label="Numero iscrizione" readOnly {...form.getInputProps("iscrizione")} />
        <TextInput label="Nome" required withAsterisk {...form.getInputProps("nome")} />
        <TextInput label="Cognome" required withAsterisk {...form.getInputProps("cognome")} />
        <DatePickerInput
        label="Data di nascita"
        valueFormat="DD/MM/YYYY"
        popoverProps={{ withinPortal: true }}
        value={form.values.dataNascita}
        onChange={(d) => form.setFieldValue("dataNascita", d as Date | null)}
        error={form.errors.dataNascita}
        />
        <TextInput label="Telefono" required withAsterisk {...form.getInputProps("telefono")} />
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
        <TextInput type="email" label="Email (se con account)" {...form.getInputProps("email")} />
        </div>
        
        <Group justify="space-between" mt="md">
        <Button type="submit">Salva modifiche</Button>
        {form.values.hasAccount && onDeleteAccount && (
            <Button color="red" variant="light" leftSection={<IconUserMinus size={18} />} onClick={onDeleteAccount}>
            Elimina account
            </Button>
        )}
        </Group>
        </form>
    );
}
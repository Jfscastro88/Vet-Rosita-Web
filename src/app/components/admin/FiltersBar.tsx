"use client";
import { Group, TextInput, NumberInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

export default function FiltersBar({ search, onSearch, pageSize, onPageSize }: {
    search: string;
    onSearch: (s: string) => void;
    pageSize: number;
    onPageSize: (n: number) => void;
}) {
    return (
        <Group gap="sm" align="end" wrap="wrap">
        <TextInput
        label="Cerca per iscrizione / cognome / telefono"
        placeholder="es. 2025-001, Rossi, +39..."
        leftSection={<IconSearch size={16} />}
        value={search}
        onChange={(e) => onSearch(e.currentTarget.value)}
        className="w-full sm:w-[420px]"
        />
        <NumberInput
        label="Righe per pagina"
        value={pageSize}
        onChange={(v) => onPageSize(Number(v) || 10)}
        min={3}
        max={20}
        allowDecimal={false}
        clampBehavior="strict"
        className="w-[180px]"
        />
        </Group>
    );
}

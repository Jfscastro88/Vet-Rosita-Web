"use client";
import { Table, Text } from "@mantine/core";
import ClientTableRow from "@/app/components/admin/ClientTableRow";
import type { Client } from "@/types/client";

export default function ClientTable({ clients, onDelete }: {
    clients: Client[];
    onDelete: (c: Client) => void;
}) {
    if (clients.length === 0) {
        return (
            <Table striped highlightOnHover withTableBorder verticalSpacing="sm">
            <Table.Thead>
            <Table.Tr>
            <Table.Th>Numero</Table.Th>
            <Table.Th>Iscrizione</Table.Th>
            <Table.Th>Cognome</Table.Th>
            <Table.Th>Telefono</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Stato</Table.Th>
            <Table.Th>Azioni</Table.Th>
            </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
            <Table.Tr><Table.Td colSpan={7}><Text c="dimmed">Nessun risultato</Text></Table.Td></Table.Tr>
            </Table.Tbody>
            </Table>
        );
    }
    
    return (
        <Table striped highlightOnHover withTableBorder verticalSpacing="sm">
        <Table.Thead>
        <Table.Tr>
        <Table.Th>Numero</Table.Th>
        <Table.Th>Iscrizione</Table.Th>
        <Table.Th>Cognome</Table.Th>
        <Table.Th>Telefono</Table.Th>
        <Table.Th>Email</Table.Th>
        <Table.Th>Stato</Table.Th>
        <Table.Th style={{ width: 120 }}>Azioni</Table.Th>
        </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
        {clients.map((c) => (
            <ClientTableRow key={c.id} client={c} onDelete={() => onDelete(c)} />
        ))}
        </Table.Tbody>
        </Table>
    );
}

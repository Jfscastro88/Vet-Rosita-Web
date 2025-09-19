"use client";
import { Table, Badge, Group, ActionIcon, Text } from "@mantine/core";
import Link from "next/link";
import { IconTrash } from "@tabler/icons-react";
import type { Client } from "@/types/client";

export default function ClientTableRow({ client, onDelete }: {
    client: Client;
    onDelete: () => void;
}) {
    return (
        <Table.Tr>
        <Table.Td>{client.id}</Table.Td>
        <Table.Td>{client.iscrizione}</Table.Td>
        <Table.Td>
        <Link href={`/admin/clients/${client.id}`} className="hover:underline">
        {client.cognome}
        </Link>
        </Table.Td>
        <Table.Td>{client.telefono}</Table.Td>
        <Table.Td>{client.email ?? <Text c="dimmed">—</Text>}</Table.Td>
        <Table.Td>
        {client.hasAccount ? <Badge color="green">Con account</Badge> : <Badge color="gray">Senza account</Badge>}
        </Table.Td>
        <Table.Td>
        <Group gap={6}>
        <ActionIcon variant="subtle" color="red" onClick={onDelete}>
        <IconTrash size={18} />
        </ActionIcon>
        </Group>
        </Table.Td>
        </Table.Tr>
    );
}
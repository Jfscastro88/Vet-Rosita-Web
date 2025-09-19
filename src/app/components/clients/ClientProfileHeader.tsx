"use client";
import { Badge, Button, Group, Text, Title } from "@mantine/core";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import type { Client } from "@/types/client";

export default function ClientProfileHeader({ client }: { client: Client }) {
    return (
        <Group justify="space-between" align="center">
        <Group>
        <Button component={Link} href="/admin" variant="subtle" leftSection={<IconArrowLeft size={18} />}>
        Torna
        </Button>
        <Title order={2}>Profilo cliente</Title>
        <Badge color={client.hasAccount ? "green" : "gray"}>
        {client.hasAccount ? "Con account" : "Senza account"}
        </Badge>
        </Group>
        <Text c="dimmed">ID: {client.id} • Iscrizione: {client.iscrizione}</Text>
        </Group>
    );
}
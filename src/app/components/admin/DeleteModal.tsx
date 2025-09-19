"use client";
import { Modal, Stack, Text, Group, Button } from "@mantine/core";
import type { Client } from "@/types/client";

export default function DeleteModal({ opened, onClose, client, onConfirm }: {
    opened: boolean;
    onClose: () => void;
    client: Client | null;
    onConfirm: () => void;
}) {
    return (
        <Modal opened={opened} onClose={onClose} title="Conferma Eliminazione!" centered>
        <Stack gap="md">
        <Text>
        Vuoi eliminare definitivamente il cliente{" "}
        <b>{client?.cognome}</b> (#{client?.id})?
        </Text>
        <Group justify="end">
        <Button variant="default" onClick={onClose}>Annulla</Button>
        <Button color="red" onClick={onConfirm}>Elimina</Button>
        </Group>
        </Stack>
        </Modal>
    );
}
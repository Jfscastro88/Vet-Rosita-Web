"use client";
import { Button, Group, Modal, Stack, Text } from "@mantine/core";

export default function DeleteAccountModal({
  opened,
  onClose,
  clientName,
  onConfirm,
}: {
  opened: boolean;
  onClose: () => void;
  clientName: string;
  onConfirm: () => void;
}) {
  return (
    <Modal opened={opened} onClose={onClose} title="Elimina account" centered>
      <Stack>
        <Text>
          Vuoi eliminare definitivamente l'account di <b>{clientName}</b>?
        </Text>
        <Group justify="end">
          <Button variant="default" onClick={onClose}>
            Annulla
          </Button>
          <Button color="red" onClick={onConfirm}>
            Elimina account
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}

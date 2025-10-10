"use client";

import { useState } from "react";
import { Button, Paper, Text, Stack, Group, Alert } from "@mantine/core";
import { IconTrash, IconInfoCircle, IconCheck } from "@tabler/icons-react";
import { cleanupPastSlots, getPastSlotsCount } from "@/app/actions/cleanupPastSlots";

export default function SlotCleanup() {
  const [loading, setLoading] = useState(false);
  const [pastSlotsCount, setPastSlotsCount] = useState<number | null>(null);
  const [cleaned, setCleaned] = useState(false);

  const checkPastSlots = async () => {
    setLoading(true);
    try {
      const result = await getPastSlotsCount();
      if (result.ok) {
        setPastSlotsCount(result.count);
      }
    } catch (error) {
      console.error("Error checking past slots:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCleanup = async () => {
    setLoading(true);
    try {
      const result = await cleanupPastSlots();
      if (result.ok) {
        setCleaned(true);
        setPastSlotsCount(0);
      }
    } catch (error) {
      console.error("Error cleaning up past slots:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper p="md" withBorder>
      <Stack>
        <Group>
          <IconInfoCircle size={20} />
          <Text fw={600} size="lg">
            Pulizia Slot Passati
          </Text>
        </Group>

        <Text size="sm" c="dimmed">
          Rimuove automaticamente gli slot di tempo passati che non sono più disponibili per la
          prenotazione.
        </Text>

        {pastSlotsCount !== null && (
          <Alert
            icon={<IconInfoCircle size={16} />}
            title="Slot Passati Trovati"
            color={pastSlotsCount > 0 ? "yellow" : "green"}
          >
            {pastSlotsCount > 0
              ? `Ci sono ${pastSlotsCount} slot passati che possono essere puliti.`
              : "Non ci sono slot passati da pulire."}
          </Alert>
        )}

        {cleaned && (
          <Alert icon={<IconCheck size={16} />} title="Pulizia Completata" color="green">
            Gli slot passati sono stati puliti con successo.
          </Alert>
        )}

        <Group>
          <Button
            variant="outline"
            onClick={checkPastSlots}
            loading={loading}
            leftSection={<IconInfoCircle size={16} />}
          >
            Verifica Slot Passati
          </Button>

          {pastSlotsCount !== null && pastSlotsCount > 0 && (
            <Button
              color="red"
              onClick={handleCleanup}
              loading={loading}
              leftSection={<IconTrash size={16} />}
            >
              Pulisci Slot Passati
            </Button>
          )}
        </Group>
      </Stack>
    </Paper>
  );
}

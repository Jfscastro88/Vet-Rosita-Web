"use client";

import { useState, useEffect } from "react";
import { Button, Paper, Stack, Title, Text, Grid, GridCol, Badge, Group } from "@mantine/core";
import { IconCalendar, IconClock, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { getSlotsInRange } from "@/app/actions/getSlots";

export type Slot = {
  id: string;
  starts_at: string;
  ends_at: string;
  status: string;
};

export type Props = {
  selectedSlotId: string | null;
  onSlotSelect: (slotId: string | null) => void;
  refreshTrigger?: number; // Add trigger to force refresh
};

export function SlotPicker({ selectedSlotId, onSlotSelect, refreshTrigger }: Props) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [currentStartDate, setCurrentStartDate] = useState<Date>(new Date());

  const loadSlots = async (date: string) => {
    setLoading(true);
    try {
      const startOfDay = new Date(date + "T00:00:00.000Z").toISOString();
      const endOfDay = new Date(date + "T23:59:59.999Z").toISOString();

      const availableSlots = await getSlotsInRange(startOfDay, endOfDay);
      setSlots(availableSlots);
    } catch (error) {
      console.error("Error loading slots:", error);
      setSlots([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      loadSlots(selectedDate);
    }
  }, [selectedDate]);

  // Refresh slots when refreshTrigger changes (after successful booking)
  useEffect(() => {
    if (refreshTrigger !== undefined && selectedDate) {
      loadSlots(selectedDate);
    }
  }, [refreshTrigger, selectedDate]);

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("it-IT", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getNextDays = () => {
    const days = [];
    const startDate = new Date(currentStartDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day

    for (let i = 0; i < 21; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      // Skip Sundays (day 0) and past dates
      if (date.getDay() !== 0 && date >= today) {
        days.push(date.toISOString().split("T")[0]);
      }

      if (days.length >= 14) break;
    }

    return days;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentStartDate);
    if (direction === "prev") {
      newDate.setDate(newDate.getDate() - 14);
    } else {
      newDate.setDate(newDate.getDate() + 14);
    }
    setCurrentStartDate(newDate);
    setSelectedDate(""); // Clear selection when navigating
  };

  const canGoPrevious = () => {
    const today = new Date();
    const firstDay = new Date(currentStartDate);
    return firstDay > today;
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <Paper withBorder shadow="sm" p="lg" className="bg-white rounded-2xl">
        <Stack gap="lg">
          <div className="flex items-center gap-2">
            <IconCalendar size={20} />
            <Title order={3}>Seleziona data e orario</Title>
          </div>

          {/* Date selector */}
          <div>
            <Group justify="space-between" mb="sm">
              <Text size="sm" fw={500}>
                Scegli una data:
              </Text>
              <Group gap="xs">
                <Button
                  variant="light"
                  size="xs"
                  onClick={() => navigateMonth("prev")}
                  leftSection={<IconChevronLeft size={14} />}
                  disabled={!canGoPrevious()}
                >
                  Precedente
                </Button>
                <Button
                  variant="light"
                  size="xs"
                  onClick={() => navigateMonth("next")}
                  rightSection={<IconChevronRight size={14} />}
                >
                  Successivo
                </Button>
              </Group>
            </Group>
            <Grid gutter="xs">
              {getNextDays().map((date) => {
                const isSelected = date === selectedDate;
                const isToday = date === new Date().toISOString().split("T")[0];

                return (
                  <GridCol span={{ base: 6, sm: 4, md: 3 }} key={date}>
                    <Button
                      variant={isSelected ? "filled" : "outline"}
                      size="sm"
                      fullWidth
                      onClick={() => setSelectedDate(date)}
                      className={isToday ? "border-blue-500" : ""}
                    >
                      <div className="text-center flex items-center justify-center gap-1">
                        <div className="text-xs">
                          {new Date(date).toLocaleDateString("it-IT", { weekday: "short" })}
                        </div>
                        <div className="font-bold text-md text-blue-550">
                          {new Date(date).getDate()}
                        </div>
                        <div className="text-xs">
                          {new Date(date).toLocaleDateString("it-IT", { month: "short" })}
                        </div>
                      </div>
                    </Button>
                  </GridCol>
                );
              })}
            </Grid>
          </div>

          {/* Selected date info */}
          {selectedDate && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <Text size="sm" className="text-blue-800">
                <strong>Data selezionata:</strong> {formatDate(selectedDate)}
              </Text>
            </div>
          )}

          {/* Time slots */}
          {selectedDate ? (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <IconClock size={16} />
                <Text size="sm" fw={500}>
                  Orari disponibili:
                </Text>
              </div>

              {loading ? (
                <div className="text-center py-8">
                  <Text size="sm" c="dimmed">
                    Caricamento orari...
                  </Text>
                </div>
              ) : slots.length === 0 ? (
                <div className="text-center py-8">
                  <Text size="sm" c="dimmed">
                    Nessun orario disponibile per questa data
                  </Text>
                  <Button variant="light" size="sm" mt="sm" onClick={() => loadSlots(selectedDate)}>
                    Ricarica
                  </Button>
                </div>
              ) : (
                <Grid gutter="xs">
                  {slots.map((slot) => {
                    const isSelected = selectedSlotId === slot.id;

                    return (
                      <GridCol span={{ base: 6, sm: 4, md: 3 }} key={slot.id}>
                        <Button
                          variant={isSelected ? "filled" : "outline"}
                          size="sm"
                          fullWidth
                          onClick={() => onSlotSelect(isSelected ? null : slot.id)}
                          className={isSelected ? "bg-blue-600" : ""}
                        >
                          {formatTime(slot.starts_at)}
                        </Button>
                      </GridCol>
                    );
                  })}
                </Grid>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <Text size="sm" c="dimmed">
                Seleziona prima una data per vedere gli orari disponibili
              </Text>
            </div>
          )}

          {/* Selected slot info */}
          {selectedSlotId && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <Badge color="green" size="sm">
                  Selezionato
                </Badge>
                <Text size="sm" className="text-green-800">
                  {(() => {
                    const selectedSlot = slots.find((s) => s.id === selectedSlotId);
                    return selectedSlot
                      ? `${formatDate(selectedDate)} alle ${formatTime(selectedSlot.starts_at)}`
                      : "";
                  })()}
                </Text>
              </div>
            </div>
          )}
        </Stack>
      </Paper>
    </div>
  );
}

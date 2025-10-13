"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import {
  Table,
  Badge,
  Button,
  Group,
  Text,
  ActionIcon,
  Menu,
  Modal,
  Select,
  Stack,
  Title,
  Paper,
  Grid,
  GridCol,
  TextInput,
} from "@mantine/core";
import {
  IconSearch,
  IconDog,
  IconPhone,
  IconMail,
  IconDots,
  IconEdit,
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import {
  getAppointments,
  getAppointmentStats,
  type Appointment,
  type AppointmentFilters,
} from "@/app/actions/getAppointments";
import {
  updateAppointment,
  cancelAppointment,
  approveAppointment,
  rejectAppointment,
} from "@/app/actions/updateAppointment";

const statusColors = {
  pending: "yellow",
  confirmed: "blue",
  cancelled: "red",
  completed: "green",
  booked: "orange",
} as const;

const statusLabels = {
  pending: "In Attesa",
  confirmed: "Confermato",
  cancelled: "Cancellato",
  completed: "Completato",
  booked: "Prenotato",
} as const;

export default function AppointmentsTable() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<AppointmentFilters>({
    status: "all",
    animal_type: "",
    date_from: "",
    date_to: "",
    sort_by: "date",
    sort_order: "desc",
  });
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    booked: 0,
    confirmed: 0,
    cancelled: 0,
    completed: 0,
  });
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [editModalOpened, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);
  // const [notes, setNotes] = useState(""); // Removed - notes not supported for appointments
  const [newStatus, setNewStatus] = useState<string>("");

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const searchFilters: AppointmentFilters = {
        ...filters,
        search: searchTerm || undefined,
      };

      const [appointmentsResult, statsResult] = await Promise.all([
        getAppointments(searchFilters),
        getAppointmentStats(),
      ]);

      if (appointmentsResult.ok) {
        console.log("Appointments data:", appointmentsResult.data);
        setAppointments(appointmentsResult.data);
      }

      if (statsResult.ok) {
        setStats(statsResult.stats);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [filters, searchTerm]);

  const handleEditAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    // setNotes(appointment.notes || ""); // Removed - notes not supported for appointments
    setNewStatus(appointment.status);
    openEditModal();
  };

  const handleSaveChanges = async () => {
    if (!selectedAppointment) return;

    try {
      const result = await updateAppointment({
        appointmentId: selectedAppointment.id,
        status: newStatus as any,
        // notes: notes, // Removed - notes not supported for appointments
      });

      if (result.ok) {
        closeEditModal();
        fetchAppointments(); // Refresh the list
      } else {
        console.error("Error updating appointment:", result.error);
      }
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      const result = await cancelAppointment(appointmentId);
      if (result.ok) {
        fetchAppointments(); // Refresh the list
      } else {
        console.error("Error cancelling appointment:", result.error);
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    }
  };

  const handleApproveAppointment = async (appointmentId: string) => {
    try {
      const result = await approveAppointment(appointmentId);
      if (result.ok) {
        fetchAppointments(); // Refresh the list
      } else {
        console.error("Error approving appointment:", result.error);
      }
    } catch (error) {
      console.error("Error approving appointment:", error);
    }
  };

  const handleRejectAppointment = async (appointmentId: string) => {
    try {
      const result = await rejectAppointment(appointmentId);
      if (result.ok) {
        fetchAppointments(); // Refresh the list
      } else {
        console.error("Error rejecting appointment:", result.error);
      }
    } catch (error) {
      console.error("Error rejecting appointment:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy HH:mm", { locale: it });
  };

  const getAnimalTypeOptions = () => {
    const types = [...new Set(appointments.map((apt) => apt.animal_type))].filter(
      (type): type is string => Boolean(type)
    );
    return types.map((type) => ({ value: type, label: type }));
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <Grid>
        <GridCol span={{ base: 12, sm: 6, md: 3 }}>
          <Paper p="md" withBorder>
            <Text size="sm" c="dimmed">
              Totale Appuntamenti
            </Text>
            <Text size="xl" fw={700}>
              {stats.total}
            </Text>
          </Paper>
        </GridCol>
        <GridCol span={{ base: 12, sm: 6, md: 3 }}>
          <Paper p="md" withBorder>
            <Text size="sm" c="dimmed">
              In Attesa
            </Text>
            <Text size="xl" fw={700} c="yellow">
              {stats.pending}
            </Text>
          </Paper>
        </GridCol>
        <GridCol span={{ base: 12, sm: 6, md: 3 }}>
          <Paper p="md" withBorder>
            <Text size="sm" c="dimmed">
              Prenotati
            </Text>
            <Text size="xl" fw={700} c="orange">
              {stats.booked}
            </Text>
          </Paper>
        </GridCol>
        <GridCol span={{ base: 12, sm: 6, md: 3 }}>
          <Paper p="md" withBorder>
            <Text size="sm" c="dimmed">
              Confermati
            </Text>
            <Text size="xl" fw={700} c="blue">
              {stats.confirmed || 0}
            </Text>
          </Paper>
        </GridCol>
        <GridCol span={{ base: 12, sm: 6, md: 3 }}>
          <Paper p="md" withBorder>
            <Text size="sm" c="dimmed">
              Cancellati
            </Text>
            <Text size="xl" fw={700} c="red">
              {stats.cancelled}
            </Text>
          </Paper>
        </GridCol>
        <GridCol span={{ base: 12, sm: 6, md: 3 }}>
          <Paper p="md" withBorder>
            <Text size="sm" c="dimmed">
              Completati
            </Text>
            <Text size="xl" fw={700} c="green">
              {stats.completed}
            </Text>
          </Paper>
        </GridCol>
      </Grid>

      {/* Filters */}
      <Paper p="md" withBorder>
        <Stack>
          <Title order={4}>Filtri e Ricerca</Title>
          <Grid>
            <GridCol span={{ base: 12, md: 4 }}>
              <TextInput
                placeholder="Cerca per nome, animale, email..."
                leftSection={<IconSearch size={16} />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </GridCol>
            <GridCol span={{ base: 12, md: 2 }}>
              <Select
                placeholder="Stato"
                data={[
                  { value: "all", label: "Tutti" },
                  { value: "pending", label: "In Attesa" },
                  { value: "booked", label: "Prenotati" },
                  { value: "confirmed", label: "Confermati" },
                  { value: "cancelled", label: "Cancellati" },
                  { value: "completed", label: "Completati" },
                ]}
                value={filters.status}
                onChange={(value) => setFilters((prev) => ({ ...prev, status: value as any }))}
              />
            </GridCol>
            <GridCol span={{ base: 12, md: 2 }}>
              <Select
                placeholder="Tipo Animale"
                data={getAnimalTypeOptions()}
                value={filters.animal_type}
                onChange={(value) => setFilters((prev) => ({ ...prev, animal_type: value || "" }))}
                clearable
              />
            </GridCol>
            <GridCol span={{ base: 12, md: 2 }}>
              <Select
                placeholder="Ordina per"
                data={[
                  { value: "date", label: "Data" },
                  { value: "client_name", label: "Cliente" },
                  { value: "animal_name", label: "Animale" },
                ]}
                value={filters.sort_by}
                onChange={(value) => setFilters((prev) => ({ ...prev, sort_by: value as any }))}
              />
            </GridCol>
            <GridCol span={{ base: 12, md: 2 }}>
              <Select
                placeholder="Ordine"
                data={[
                  { value: "asc", label: "Crescente" },
                  { value: "desc", label: "Decrescente" },
                ]}
                value={filters.sort_order}
                onChange={(value) => setFilters((prev) => ({ ...prev, sort_order: value as any }))}
              />
            </GridCol>
          </Grid>
        </Stack>
      </Paper>

      {/* Appointments Table */}
      <Paper withBorder>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Data e Ora</Table.Th>
              <Table.Th>Cliente</Table.Th>
              <Table.Th>Animale</Table.Th>
              <Table.Th>Contatti</Table.Th>
              <Table.Th>Stato</Table.Th>
              <Table.Th>Azioni</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {loading ? (
              <Table.Tr>
                <Table.Td colSpan={6} ta="center">
                  <Text>Caricamento...</Text>
                </Table.Td>
              </Table.Tr>
            ) : appointments.length === 0 ? (
              <Table.Tr>
                <Table.Td colSpan={6} ta="center">
                  <Text c="dimmed">Nessun appuntamento trovato</Text>
                </Table.Td>
              </Table.Tr>
            ) : (
              appointments.map((appointment) => (
                <Table.Tr key={appointment.id}>
                  <Table.Td>
                    <Text size="sm" fw={500}>
                      {formatDate(appointment.starts_at)}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Stack gap={4}>
                      <Text size="sm" fw={500}>
                        {appointment.client_first_name} {appointment.client_last_name}
                      </Text>
                    </Stack>
                  </Table.Td>
                  <Table.Td>
                    <Stack gap={4}>
                      <Group gap={4}>
                        <IconDog size={14} />
                        <Text size="sm" fw={500}>
                          {appointment.animal_name}
                        </Text>
                      </Group>
                    </Stack>
                  </Table.Td>
                  <Table.Td>
                    <Stack gap={2}>
                      <Group gap={4}>
                        <IconPhone size={12} />
                        <Text size="xs">{appointment.client_phone}</Text>
                      </Group>
                      <Group gap={4}>
                        <IconMail size={12} />
                        <Text size="xs">{appointment.client_email}</Text>
                      </Group>
                    </Stack>
                  </Table.Td>
                  <Table.Td>
                    <Badge color={statusColors[appointment.status] || "gray"}>
                      {statusLabels[appointment.status] || "Sconosciuto"}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Menu>
                      <Menu.Target>
                        <ActionIcon variant="subtle">
                          <IconDots size={16} />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item
                          leftSection={<IconEdit size={14} />}
                          onClick={() => handleEditAppointment(appointment)}
                        >
                          Modifica
                        </Menu.Item>
                        {appointment.status === "pending" && (
                          <>
                            <Menu.Item
                              leftSection={<IconCheck size={14} />}
                              color="green"
                              onClick={() => handleApproveAppointment(appointment.id)}
                            >
                              Approva
                            </Menu.Item>
                            <Menu.Item
                              leftSection={<IconX size={14} />}
                              color="red"
                              onClick={() => handleRejectAppointment(appointment.id)}
                            >
                              Rifiuta
                            </Menu.Item>
                          </>
                        )}
                        {appointment.status === "confirmed" && (
                          <Menu.Item
                            leftSection={<IconX size={14} />}
                            color="red"
                            onClick={() => handleCancelAppointment(appointment.id)}
                          >
                            Cancella
                          </Menu.Item>
                        )}
                      </Menu.Dropdown>
                    </Menu>
                  </Table.Td>
                </Table.Tr>
              ))
            )}
          </Table.Tbody>
        </Table>
      </Paper>

      {/* Edit Modal */}
      <Modal
        opened={editModalOpened}
        onClose={closeEditModal}
        title="Modifica Appuntamento"
        size="md"
      >
        {selectedAppointment && (
          <Stack>
            <TextInput
              label="Cliente"
              value={`${selectedAppointment.client_first_name} ${selectedAppointment.client_last_name}`}
              disabled
            />
            <TextInput
              label="Animale"
              value={`${selectedAppointment.animal_name} (${selectedAppointment.animal_type})`}
              disabled
            />
            <TextInput
              label="Data e Ora"
              value={formatDate(selectedAppointment.starts_at)}
              disabled
            />
            <Select
              label="Stato"
              data={[
                { value: "pending", label: "In Attesa" },
                { value: "booked", label: "Prenotato" },
                { value: "confirmed", label: "Confermato" },
                { value: "cancelled", label: "Cancellato" },
                { value: "completed", label: "Completato" },
              ]}
              value={newStatus}
              onChange={(value) => setNewStatus(value || "")}
            />
            {/* Notes functionality removed - notes column doesn't exist in appointments table */}
            {/* <Textarea
              label="Note"
              placeholder="Aggiungi note..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              autosize
              minRows={3}
            /> */}
            <Group justify="flex-end">
              <Button variant="outline" onClick={closeEditModal}>
                Annulla
              </Button>
              <Button onClick={handleSaveChanges}>Salva Modifiche</Button>
            </Group>
          </Stack>
        )}
      </Modal>
    </div>
  );
}

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
  Textarea,
  Stack,
  Title,
  Paper,
  Grid,
  GridCol,
  TextInput,
  Select,
} from "@mantine/core";
import {
  IconSearch,
  IconFilter,
  IconUser,
  IconPhone,
  IconMail,
  IconCalendar,
  IconDots,
  IconEdit,
  IconTrash,
  IconEye,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import {
  getClients,
  getClientStats,
  type Client,
  type ClientFilters,
} from "@/app/actions/getClients";

export default function ClientsTable() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<ClientFilters>({
    sort_by: "name",
    sort_order: "asc",
  });
  const [stats, setStats] = useState({ total: 0 });
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [viewModalOpened, { open: openViewModal, close: closeViewModal }] = useDisclosure(false);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const searchFilters: ClientFilters = {
        ...filters,
        search: searchTerm || undefined,
      };

      const [clientsResult, statsResult] = await Promise.all([
        getClients(searchFilters),
        getClientStats(),
      ]);

      if (clientsResult.ok) {
        setClients(clientsResult.data);
      }

      if (statsResult.ok) {
        setStats(statsResult.stats);
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, [filters, searchTerm]);

  const handleViewClient = (client: Client) => {
    setSelectedClient(client);
    openViewModal();
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy", { locale: it });
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <Grid>
        <GridCol span={{ base: 12, sm: 6, md: 4 }}>
          <Paper p="md" withBorder>
            <Text size="sm" c="dimmed">
              Totale Clienti
            </Text>
            <Text size="xl" fw={700}>
              {stats.total}
            </Text>
          </Paper>
        </GridCol>
        <GridCol span={{ base: 12, sm: 6, md: 4 }}>
          <Paper p="md" withBorder>
            <Text size="sm" c="dimmed">
              Clienti Attivi
            </Text>
            <Text size="xl" fw={700} c="blue">
              {clients.length}
            </Text>
          </Paper>
        </GridCol>
        <GridCol span={{ base: 12, sm: 6, md: 4 }}>
          <Paper p="md" withBorder>
            <Text size="sm" c="dimmed">
              Nuovi Questo Mese
            </Text>
            <Text size="xl" fw={700} c="green">
              {
                clients.filter((client) => {
                  const clientDate = new Date(client.created_at);
                  const now = new Date();
                  return (
                    clientDate.getMonth() === now.getMonth() &&
                    clientDate.getFullYear() === now.getFullYear()
                  );
                }).length
              }
            </Text>
          </Paper>
        </GridCol>
      </Grid>

      {/* Filters */}
      <Paper p="md" withBorder>
        <Stack>
          <Title order={4}>Filtri e Ricerca</Title>
          <Grid>
            <GridCol span={{ base: 12, md: 6 }}>
              <TextInput
                placeholder="Cerca per nome, email, telefono..."
                leftSection={<IconSearch size={16} />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </GridCol>
            <GridCol span={{ base: 12, md: 3 }}>
              <Select
                placeholder="Ordina per"
                data={[
                  { value: "name", label: "Nome" },
                  { value: "email", label: "Email" },
                  { value: "created_at", label: "Data Registrazione" },
                ]}
                value={filters.sort_by}
                onChange={(value) => setFilters((prev) => ({ ...prev, sort_by: value as any }))}
              />
            </GridCol>
            <GridCol span={{ base: 12, md: 3 }}>
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

      {/* Clients Table */}
      <Paper withBorder>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Cliente</Table.Th>
              <Table.Th>Contatti</Table.Th>
              <Table.Th>Età</Table.Th>
              <Table.Th>Registrato</Table.Th>
              <Table.Th>Azioni</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {loading ? (
              <Table.Tr>
                <Table.Td colSpan={5} ta="center">
                  <Text>Caricamento...</Text>
                </Table.Td>
              </Table.Tr>
            ) : clients.length === 0 ? (
              <Table.Tr>
                <Table.Td colSpan={5} ta="center">
                  <Text c="dimmed">Nessun cliente trovato</Text>
                </Table.Td>
              </Table.Tr>
            ) : (
              clients.map((client) => (
                <Table.Tr key={client.id}>
                  <Table.Td>
                    <Stack gap={4}>
                      <Text size="sm" fw={500}>
                        {client.first_name} {client.last_name}
                      </Text>
                      <Text size="xs" c="dimmed">
                        ID: {client.id}
                      </Text>
                    </Stack>
                  </Table.Td>
                  <Table.Td>
                    <Stack gap={2}>
                      <Group gap={4}>
                        <IconPhone size={12} />
                        <Text size="xs">{client.phone}</Text>
                      </Group>
                      <Group gap={4}>
                        <IconMail size={12} />
                        <Text size="xs">{client.email}</Text>
                      </Group>
                    </Stack>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm">{calculateAge(client.birth_date)} anni</Text>
                    <Text size="xs" c="dimmed">
                      Nato: {formatDate(client.birth_date)}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm">{formatDate(client.created_at)}</Text>
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
                          leftSection={<IconEye size={14} />}
                          onClick={() => handleViewClient(client)}
                        >
                          Visualizza
                        </Menu.Item>
                        <Menu.Item leftSection={<IconEdit size={14} />}>Modifica</Menu.Item>
                        <Menu.Item leftSection={<IconTrash size={14} />} color="red">
                          Elimina
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Table.Td>
                </Table.Tr>
              ))
            )}
          </Table.Tbody>
        </Table>
      </Paper>

      {/* View Client Modal */}
      <Modal opened={viewModalOpened} onClose={closeViewModal} title="Dettagli Cliente" size="md">
        {selectedClient && (
          <Stack>
            <Paper p="md" withBorder>
              <Stack gap="sm">
                <Group>
                  <IconUser size={20} />
                  <Text fw={600} size="lg">
                    {selectedClient.first_name} {selectedClient.last_name}
                  </Text>
                </Group>

                <Group>
                  <IconPhone size={16} />
                  <Text>{selectedClient.phone}</Text>
                </Group>

                <Group>
                  <IconMail size={16} />
                  <Text>{selectedClient.email}</Text>
                </Group>

                <Group>
                  <IconCalendar size={16} />
                  <Text>
                    Nato il {formatDate(selectedClient.birth_date)}(
                    {calculateAge(selectedClient.birth_date)} anni)
                  </Text>
                </Group>

                <Text size="sm" c="dimmed">
                  Registrato il {formatDate(selectedClient.created_at)}
                </Text>
              </Stack>
            </Paper>

            <Group justify="flex-end">
              <Button variant="outline" onClick={closeViewModal}>
                Chiudi
              </Button>
            </Group>
          </Stack>
        )}
      </Modal>
    </div>
  );
}

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
  Stack,
  Title,
  Paper,
  Grid,
  GridCol,
  TextInput,
  Select,
  Avatar,
} from "@mantine/core";
import {
  IconSearch,
  IconFilter,
  IconDog,
  IconUser,
  IconCalendar,
  IconDots,
  IconEdit,
  IconTrash,
  IconEye,
  IconPaw,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { getPets, getPetStats, type Pet, type PetFilters } from "@/app/actions/getPets";

const animalIcons = {
  cane: "🐕",
  gatto: "🐱",
  coniglio: "🐰",
  criceto: "🐹",
  uccello: "🐦",
  pesce: "🐠",
  tartaruga: "🐢",
  default: "🐾",
};

const animalColors = {
  cane: "blue",
  gatto: "orange",
  coniglio: "pink",
  criceto: "yellow",
  uccello: "cyan",
  pesce: "teal",
  tartaruga: "green",
  default: "gray",
};

export default function PetsTable() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<PetFilters>({
    sort_by: "name",
    sort_order: "asc",
  });
  const [stats, setStats] = useState({ total: 0, by_type: {} as Record<string, number> });
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [viewModalOpened, { open: openViewModal, close: closeViewModal }] = useDisclosure(false);

  const fetchPets = async () => {
    setLoading(true);
    try {
      const searchFilters: PetFilters = {
        ...filters,
        search: searchTerm || undefined,
      };

      const [petsResult, statsResult] = await Promise.all([getPets(searchFilters), getPetStats()]);

      if (petsResult.ok) {
        setPets(petsResult.data);
      }

      if (statsResult.ok) {
        setStats(statsResult.stats);
      }
    } catch (error) {
      console.error("Error fetching pets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, [filters, searchTerm]);

  const handleViewPet = (pet: Pet) => {
    setSelectedPet(pet);
    openViewModal();
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy", { locale: it });
  };

  const getAnimalIcon = (type: string) => {
    const normalizedType = type.toLowerCase();
    return animalIcons[normalizedType as keyof typeof animalIcons] || animalIcons.default;
  };

  const getAnimalColor = (type: string) => {
    const normalizedType = type.toLowerCase();
    return animalColors[normalizedType as keyof typeof animalColors] || animalColors.default;
  };

  const getAnimalTypeOptions = () => {
    const types = [...new Set(pets.map((pet) => pet.type))];
    return types.map((type) => ({ value: type, label: type }));
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <Grid>
        <GridCol span={{ base: 12, sm: 6, md: 3 }}>
          <Paper p="md" withBorder>
            <Text size="sm" c="dimmed">
              Totale Animali
            </Text>
            <Text size="xl" fw={700}>
              {stats.total}
            </Text>
          </Paper>
        </GridCol>
        {Object.entries(stats.by_type)
          .slice(0, 3)
          .map(([type, count]) => (
            <GridCol key={type} span={{ base: 12, sm: 6, md: 3 }}>
              <Paper p="md" withBorder>
                <Group gap="xs">
                  <Text size="lg">{getAnimalIcon(type)}</Text>
                  <div>
                    <Text size="sm" c="dimmed" tt="capitalize">
                      {type}s
                    </Text>
                    <Text size="xl" fw={700} c={getAnimalColor(type)}>
                      {count}
                    </Text>
                  </div>
                </Group>
              </Paper>
            </GridCol>
          ))}
      </Grid>

      {/* Filters */}
      <Paper p="md" withBorder>
        <Stack>
          <Title order={4}>Filtri e Ricerca</Title>
          <Grid>
            <GridCol span={{ base: 12, md: 4 }}>
              <TextInput
                placeholder="Cerca per nome, tipo, proprietario..."
                leftSection={<IconSearch size={16} />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </GridCol>
            <GridCol span={{ base: 12, md: 3 }}>
              <Select
                placeholder="Tipo Animale"
                data={getAnimalTypeOptions()}
                value={filters.animal_type}
                onChange={(value) => setFilters((prev) => ({ ...prev, animal_type: value || "" }))}
                clearable
              />
            </GridCol>
            <GridCol span={{ base: 12, md: 3 }}>
              <Select
                placeholder="Ordina per"
                data={[
                  { value: "name", label: "Nome" },
                  { value: "type", label: "Tipo" },
                  { value: "age", label: "Età" },
                  { value: "owner", label: "Proprietario" },
                  { value: "created_at", label: "Data Registrazione" },
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

      {/* Pets Table */}
      <Paper withBorder>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Animale</Table.Th>
              <Table.Th>Proprietario</Table.Th>
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
            ) : pets.length === 0 ? (
              <Table.Tr>
                <Table.Td colSpan={5} ta="center">
                  <Stack gap="sm" align="center">
                    <Text c="dimmed">Nessun animale trovato</Text>
                    <Text size="sm" c="dimmed">
                      Questo potrebbe indicare che non ci sono ancora animali registrati nel
                      database.
                    </Text>
                    <Text size="xs" c="dimmed">
                      Verifica che i dati siano stati inseriti correttamente nelle tabelle 'animals'
                      e 'clients'.
                    </Text>
                  </Stack>
                </Table.Td>
              </Table.Tr>
            ) : (
              pets.map((pet) => (
                <Table.Tr key={pet.id}>
                  <Table.Td>
                    <Group gap="sm">
                      <Avatar size="sm" color={getAnimalColor(pet.type)}>
                        {getAnimalIcon(pet.type)}
                      </Avatar>
                      <Stack gap={2}>
                        <Text size="sm" fw={500}>
                          {pet.name}
                        </Text>
                        <Badge size="xs" color={getAnimalColor(pet.type)} variant="light">
                          {pet.type}
                        </Badge>
                      </Stack>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Stack gap={2}>
                      <Text size="sm" fw={500}>
                        {pet.owner_name}
                      </Text>
                      <Text size="xs" c="dimmed">
                        {pet.owner_email}
                      </Text>
                    </Stack>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm">
                      {pet.age_years ? `${pet.age_years} anni` : "Non specificato"}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm">{formatDate(pet.created_at)}</Text>
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
                          onClick={() => handleViewPet(pet)}
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

      {/* View Pet Modal */}
      <Modal opened={viewModalOpened} onClose={closeViewModal} title="Dettagli Animale" size="md">
        {selectedPet && (
          <Stack>
            <Paper p="md" withBorder>
              <Stack gap="sm">
                <Group>
                  <Avatar size="lg" color={getAnimalColor(selectedPet.type)}>
                    {getAnimalIcon(selectedPet.type)}
                  </Avatar>
                  <div>
                    <Text fw={600} size="lg">
                      {selectedPet.name}
                    </Text>
                    <Badge color={getAnimalColor(selectedPet.type)} variant="light">
                      {selectedPet.type}
                    </Badge>
                  </div>
                </Group>

                <Group>
                  <IconUser size={16} />
                  <div>
                    <Text size="sm" fw={500}>
                      Proprietario
                    </Text>
                    <Text size="sm">{selectedPet.owner_name}</Text>
                    <Text size="xs" c="dimmed">
                      {selectedPet.owner_email}
                    </Text>
                  </div>
                </Group>

                <Group>
                  <IconCalendar size={16} />
                  <div>
                    <Text size="sm" fw={500}>
                      Età
                    </Text>
                    <Text size="sm">
                      {selectedPet.age_years ? `${selectedPet.age_years} anni` : "Non specificato"}
                    </Text>
                  </div>
                </Group>

                <Text size="sm" c="dimmed">
                  Registrato il {formatDate(selectedPet.created_at)}
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

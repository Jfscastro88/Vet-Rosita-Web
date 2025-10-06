"use client";
import React, { Suspense } from "react";
import Link from "next/link";
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Group,
  Modal,
  NumberInput,
  Pagination,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
  Loader,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch, IconTrash, IconUserPlus, IconUser } from "@tabler/icons-react";

type Client = {
  id: number;
  iscrizione: string;
  cognome: string;
  telefono: string;
  email?: string;
  hasAccount: boolean;
};

function AdminDashboardContent() {
  const [data, setData] = React.useState<Client[]>([]);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [search, setSearch] = React.useState("");
  const [toDelete, setToDelete] = React.useState<Client | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  // ---- Filters ----
  const filtered = React.useMemo(() => {
    if (!search.trim()) return data;
    const q = search.toLowerCase();
    return data.filter(
      (c) =>
        c.id.toString().includes(q) ||
        c.iscrizione.toLowerCase().includes(q) ||
        c.cognome.toLowerCase().includes(q) ||
        c.telefono.toLowerCase().includes(q)
    );
  }, [data, search]);

  // ---- Pagination ----
  const total = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  React.useEffect(() => {
    setPage(1);
  }, [search, pageSize]);

  // ---- Delete ----
  function requestDelete(client: Client) {
    setToDelete(client);
    open();
  }

  function confirmDelete() {
    if (!toDelete) return;
    setData((prev) => prev.filter((c) => c.id !== toDelete.id));
    close();
    setToDelete(null);
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 p-4 pt-24 sm:pt-28">
      <Card withBorder radius="lg" shadow="sm" className="mx-auto max-w-6xl">
        <Stack gap="md">
          <Group justify="space-between" align="center">
            <Title order={2}>Dashboard</Title>
            <Group gap="xs">
              <Group gap="xs">
                <Button component={Link} href="/admin/clients/new">
                  Aggiungi cliente
                </Button>
              </Group>
            </Group>
          </Group>

          {/* Tools */}
          <Group gap="sm" align="end" wrap="wrap">
            <TextInput
              label="Cerca per iscrizione / cognome / telefono"
              placeholder="es. 2025-001, Rossi, +39..."
              leftSection={<IconSearch size={16} />}
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
              className="w-full sm:w-[420px]"
            />

            <NumberInput
              label="Righe per pagina"
              value={pageSize}
              onChange={(v) => setPageSize(Number(v) || 10)}
              min={3}
              max={20}
              allowDecimal={false}
              clampBehavior="strict"
              className="w-[180px]"
            />
          </Group>

          {/* Table */}
          <div className="overflow-x-auto">
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
                {pageData.length === 0 ? (
                  <Table.Tr>
                    <Table.Td colSpan={7}>
                      <Text c="dimmed">Nessun risultato</Text>
                    </Table.Td>
                  </Table.Tr>
                ) : (
                  pageData.map((c) => (
                    <Table.Tr key={c.id}>
                      <Table.Td>{c.id}</Table.Td>
                      <Table.Td>{c.iscrizione}</Table.Td>
                      <Table.Td>
                        <Link href={`/admin/clients/${c.id}`} className="hover:underline">
                          {c.cognome}
                        </Link>
                      </Table.Td>
                      <Table.Td>{c.telefono}</Table.Td>
                      <Table.Td>{c.email ?? <Text c="dimmed">—</Text>}</Table.Td>
                      <Table.Td>
                        {c.hasAccount ? (
                          <Badge color="green">Con account</Badge>
                        ) : (
                          <Badge color="gray">Senza account</Badge>
                        )}
                      </Table.Td>
                      <Table.Td>
                        <Group gap={6}>
                          <ActionIcon
                            variant="subtle"
                            color="red"
                            aria-label="Elimina"
                            onClick={() => requestDelete(c)}
                          >
                            <IconTrash size={18} />
                          </ActionIcon>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))
                )}
              </Table.Tbody>
            </Table>
          </div>

          <Group justify="space-between" align="center">
            <Text size="sm" c="dimmed">
              {filtered.length} clienti • pagina {page} di {total}
            </Text>
            <Pagination value={page} onChange={setPage} total={total} radius="md" />
          </Group>
        </Stack>
      </Card>

      <Modal opened={opened} onClose={close} title="Conferma Eliminazione!" centered>
        <Stack gap="md">
          <Text>
            Vuoi eliminare definitivamente il cliente <b>{toDelete?.cognome}</b> (#{toDelete?.id})?
          </Text>
          <Group justify="end">
            <Button variant="default" onClick={close}>
              Annulla
            </Button>
            <Button color="red" onClick={confirmDelete}>
              Elimina
            </Button>
          </Group>
        </Stack>
      </Modal>
    </div>
  );
}

// Loading component
function AdminLoading() {
  return (
    <div className="min-h-screen bg-white text-gray-900 p-4 pt-24 sm:pt-28 flex items-center justify-center">
      <Card withBorder radius="lg" shadow="sm" className="max-w-md w-full">
        <Stack gap="md" align="center">
          <Loader size="lg" />
          <Text>Caricamento dashboard...</Text>
        </Stack>
      </Card>
    </div>
  );
}

// Main export with Suspense
export default function AdminDashboard() {
  return (
    <Suspense fallback={<AdminLoading />}>
      <AdminDashboardContent />
    </Suspense>
  );
}

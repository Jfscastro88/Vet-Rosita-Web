"use client";
import React from "react";
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
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { IconSearch, IconTrash, IconUserPlus, IconUser } from "@tabler/icons-react";

// ---- Types ----
type Client = {
    id: number; // numero (ID interno)
    iscrizione: string; // numero iscrizione (string per flessibilità)
    cognome: string;
    telefono: string;
    email?: string;
    hasAccount: boolean; // true se ha un account (email/password)
};

// ---- Mock data (demo) ----
const MOCK: Client[] = [
    { id: 1, iscrizione: "A-1001", cognome: "Rossi", telefono: "+39 333 111 2222", email: "anna.rossi@example.com", hasAccount: true },
    { id: 2, iscrizione: "A-1002", cognome: "Bianchi", telefono: "+39 339 555 8888", hasAccount: false },
    { id: 3, iscrizione: "B-2301", cognome: "Verdi", telefono: "+39 320 777 9999", email: "marco.verdi@example.com", hasAccount: true },
    { id: 4, iscrizione: "C-9920", cognome: "Neri", telefono: "+39 345 000 1234", hasAccount: false },
    { id: 5, iscrizione: "D-1100", cognome: "Esposito", telefono: "+39 328 111 2233", email: "luca.esposito@example.com", hasAccount: true },
    { id: 6, iscrizione: "D-1101", cognome: "Romano", telefono: "+39 329 444 5566", email: "giulia.romano@example.com", hasAccount: true },
    { id: 7, iscrizione: "E-4500", cognome: "Colombo", telefono: "+39 331 777 8899", email: "paolo.colombo@example.com", hasAccount: true },
    { id: 8, iscrizione: "F-2205", cognome: "Ricci", telefono: "+39 334 222 3344", email: "sara.ricci@example.com", hasAccount: true },
    { id: 9, iscrizione: "F-2206", cognome: "Marino", telefono: "+39 335 555 6677", email: "andrea.marino@example.com", hasAccount: true },
    { id: 10, iscrizione: "G-3301", cognome: "Greco", telefono: "+39 336 888 9900", email: "francesca.greco@example.com", hasAccount: true },
];

export default function AdminDashboard() {
    const [data, setData] = React.useState<Client[]>(MOCK);
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(10);
    const [search, setSearch] = React.useState("");
    const [toDelete, setToDelete] = React.useState<Client | null>(null);
    const [opened, { open, close }] = useDisclosure(false);
    
    // ---- Filters ----
    const filtered = React.useMemo(() => {
        if (!search.trim()) return data;
        const q = search.toLowerCase();
        return data.filter((c) =>
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
    // reset page when filters change
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
    <Button
    component={Link}
    href="/admin/clients/new-with-account"
    leftSection={<IconUserPlus size={18} />}
    >
    Aggiungi cliente
    </Button>
    <Button
    component={Link}
    href="/admin/clients/new-without-account"
    variant="default"
    leftSection={<IconUser size={18} />}
    >
    Aggiungi cliente (senza account)
    </Button>
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
            <Table.Td>{c.cognome}</Table.Td>
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
            {/* (Futuro) component={Link} href={`/admin/clients/${c.id}`} */}
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
    
    {/* Modal conferma eliminazione */}
    <Modal opened={opened} onClose={close} title="Conferma Eliminazione!" centered>
    <Stack gap="md">
    <Text>
    Vuoi eliminare definitivamente il cliente
    {" "}
    <b>{toDelete?.cognome}</b> (#{toDelete?.id})?
    </Text>
    <Group justify="end">
    <Button variant="default" onClick={close}>Annulla</Button>
    <Button color="red" onClick={confirmDelete}>Elimina</Button>
    </Group>
    </Stack>
    </Modal>
    </div>
);
}

// --- Dev-only smoke test ---
if (process.env.NODE_ENV !== "production") {
    console.assert(Array.isArray(MOCK) && MOCK.length > 0, "[test] mock clients presenti");
}

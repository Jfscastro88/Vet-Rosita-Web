"use client";

import React from "react";
import { Card, Divider, Stack, Title } from "@mantine/core";
import { useParams } from "next/navigation";
import type { Client } from "@/types/client";
import type { Animal } from "@/types/animal";
import ClientProfileHeader from "@/app/components/clients/ClientProfileHeader";
import ClientForm from "@/app/components/clients/ClientForm";
import ClientEditForm from "@/app/components/clients/ClientEditForm";
import { ClientUpdateValues } from "@/lib/validators/client";
import DeleteAccountModal from "@/app/components/clients/DeleteAccountModal";
import AnimalAddForm from "@/app/components/animals/AnimalAddForm";
import AnimalsTable from "@/app/components/animals/AnimalsTable";
import AnimalEditModal from "@/app/components/animals/AnimalEditModal";
import { type AnimalFormValues } from "@/lib/validators/animail";

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export default function Page() {
  const params = useParams() as { id?: string };
  const clientId = Number(params?.id ?? 0);

  // ---- Mock dati iniziali (sostituisci con fetch DB) ----
  const [client, setClient] = React.useState<Client>({
    id: clientId || 1,
    iscrizione: "2025-0007",
    nome: "Giulia",
    cognome: "Romano",
    dataNascita: new Date(1992, 4, 12),
    telefono: "+39 329 444 5566",
    sesso: "f",
    email: "giulia.romano@example.com",
    hasAccount: true,
  });

  const [animals, setAnimals] = React.useState<Animal[]>([
    { id: uid(), nome: "Vicky", eta: 3, sesso: "f", tipo: "gatto" },
    { id: uid(), nome: "Toto", eta: 1, sesso: "m", tipo: "topo" },
  ]);

  // ---- Handlers ----
  function handleSaveClient(values: ClientUpdateValues) {
    // preserva l'id (e altri metadati) del client corrente
    setClient((prev) => ({ ...prev, ...values }));
    alert("Dati cliente aggiornati (demo)");
  }

  const [delOpen, setDelOpen] = React.useState(false);
  function openDelete() {
    setDelOpen(true);
  }
  function confirmDeleteAccount() {
    // TODO: supabase.auth.admin.deleteUser(userId) + update client
    setClient((c) => ({ ...c, hasAccount: false, email: undefined }));
    setDelOpen(false);
    alert("Account eliminato (demo)");
  }

  function handleAddAnimal(v: AnimalFormValues) {
    const toAdd: Animal = {
      id: uid(),
      nome: v.nome,
      eta: v.eta,
      sesso: v.sesso,
      tipo: v.tipo === "altro" ? "altro" : v.tipo,
      altro: v.tipo === "altro" ? v.altro : undefined,
    };
    setAnimals((prev) => [toAdd, ...prev]);
  }

  const [editing, setEditing] = React.useState<Animal | null>(null);
  function startEdit(a: Animal) {
    setEditing(a);
  }
  function saveEdit(v: AnimalFormValues) {
    if (!editing) return;

    const updated: Animal = {
      ...editing,
      nome: v.nome,
      eta: v.eta,
      sesso: v.sesso,
      tipo: v.tipo === "altro" ? "altro" : v.tipo,
      altro: v.tipo === "altro" ? v.altro : undefined,
    };

    setAnimals((prev) => prev.map((x) => (x.id === editing.id ? updated : x)));
    setEditing(null);
  }
  function removeAnimal(id: string) {
    // TODO: delete DB
    setAnimals((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 p-4 pt-24 sm:pt-28 flex items-start justify-center">
      <Card withBorder radius="lg" shadow="sm" className="w-full max-w-6xl">
        <Stack gap="lg">
          <ClientProfileHeader client={client} />

          <Card withBorder radius="md" padding="lg">
            <Stack gap="md">
              <Title order={4}>Dati personali</Title>
              <ClientEditForm
                client={client}
                onSave={handleSaveClient}
                onDeleteAccount={() => setDelOpen(true)}
              />
            </Stack>
          </Card>

          <Divider label="Animali" labelPosition="center" my="xs" />

          <Card withBorder radius="md" padding="lg">
            <Stack gap="md">
              <Title order={4}>Aggiungi animale</Title>
              <AnimalAddForm onAdd={handleAddAnimal} />
            </Stack>
          </Card>

          <Card withBorder radius="md" padding="lg">
            <AnimalsTable animals={animals} onEdit={startEdit} onDelete={removeAnimal} />
          </Card>
        </Stack>
      </Card>

      <DeleteAccountModal
        opened={delOpen}
        onClose={() => setDelOpen(false)}
        clientName={`${client.nome} ${client.cognome}`}
        onConfirm={confirmDeleteAccount}
      />

      <AnimalEditModal
        opened={!!editing}
        animal={editing}
        onClose={() => setEditing(null)}
        onSave={saveEdit}
      />
    </div>
  );
}

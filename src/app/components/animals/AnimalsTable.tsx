"use client";
import { ActionIcon, Badge, Group, Table, Text } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import type { Animal } from "@/types/animal";

export default function AnimalsTable({
  animals,
  onEdit,
  onDelete,
}: {
  animals: Animal[];
  onEdit: (a: Animal) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <Table striped highlightOnHover withTableBorder verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Nome</Table.Th>
            <Table.Th>Età</Table.Th>
            <Table.Th>Sesso</Table.Th>
            <Table.Th>Tipo</Table.Th>
            <Table.Th style={{ width: 120 }}>Azioni</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {animals.length === 0 ? (
            <Table.Tr>
              <Table.Td colSpan={5}>
                <Text c="dimmed">Nessun animale</Text>
              </Table.Td>
            </Table.Tr>
          ) : (
            animals.map((a) => (
              <Table.Tr key={a.id}>
                <Table.Td>{a.nome}</Table.Td>
                <Table.Td>{a.eta}</Table.Td>
                <Table.Td>
                  {a.sesso === "m" ? (
                    <Badge>Maschio</Badge>
                  ) : a.sesso === "f" ? (
                    <Badge>Femmina</Badge>
                  ) : (
                    <Badge color="gray">—</Badge>
                  )}
                </Table.Td>
                <Table.Td>{a.tipo}</Table.Td>
                <Table.Td>
                  <Group gap={6}>
                    <ActionIcon variant="subtle" aria-label="Modifica" onClick={() => onEdit(a)}>
                      <IconEdit size={18} />
                    </ActionIcon>
                    <ActionIcon
                      variant="subtle"
                      color="red"
                      aria-label="Elimina"
                      onClick={() => onDelete(a.id)}
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
  );
}

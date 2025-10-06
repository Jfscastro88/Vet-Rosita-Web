"use client";
import React from "react";
import { Button, Group, Modal, NumberInput, Select, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { animalSchema, type AnimalFormValues } from "@/lib/validators/animail";
import { mantineZodResolver } from "@/lib/validators/mantineZodResolver";
import type { Animal } from "@/types/animal";

export default function AnimalEditModal({
  opened,
  animal,
  onClose,
  onSave,
}: {
  opened: boolean;
  animal: Animal | null;
  onClose: () => void;
  onSave: (v: AnimalFormValues) => void;
}) {
  const form = useForm<AnimalFormValues>({
    initialValues: { nome: "", eta: 0, sesso: "n", tipo: "cane", altro: "" },
    validate: mantineZodResolver(animalSchema),
  });

  React.useEffect(() => {
    if (!opened || !animal) return;
    const isPreset = [
      "cane",
      "gatto",
      "coniglio",
      "roditore",
      "uccello",
      "rettile",
      "anfibio",
      "pesce",
    ].includes(animal.tipo);
    form.setValues({
      nome: animal.nome,
      eta: animal.eta,
      sesso: animal.sesso,
      tipo: (isPreset ? animal.tipo : "altro") as AnimalFormValues["tipo"],
      altro: isPreset ? "" : animal.tipo,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened, animal]);

  return (
    <Modal opened={opened} onClose={onClose} title="Modifica animale" centered>
      <Stack>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput label="Nome" required withAsterisk {...form.getInputProps("nome")} />
          <NumberInput
            label="Età (anni)"
            required
            withAsterisk
            min={0}
            {...form.getInputProps("eta")}
          />
          <Select
            label="Sesso"
            required
            withAsterisk
            data={[
              { value: "m", label: "Maschio" },
              { value: "f", label: "Femmina" },
              { value: "n", label: "Non specificato" },
            ]}
            {...form.getInputProps("sesso")}
          />
          <Select
            label="Tipo"
            required
            withAsterisk
            data={[
              { value: "cane", label: "Cane" },
              { value: "gatto", label: "Gatto" },
              { value: "coniglio", label: "Coniglio" },
              { value: "roditore", label: "Roditore" },
              { value: "uccello", label: "Uccello" },
              { value: "rettile", label: "Rettile" },
              { value: "anfibio", label: "Anfibio" },
              { value: "pesce", label: "Pesce" },
              { value: "altro", label: "Altro" },
            ]}
            {...form.getInputProps("tipo")}
          />
          {form.values.tipo === "altro" && (
            <TextInput label="Specifica (Altro)" {...form.getInputProps("altro")} />
          )}
        </div>
        <Group justify="end">
          <Button variant="default" onClick={onClose}>
            Annulla
          </Button>
          <Button onClick={() => onSave(form.values)}>Salva</Button>
        </Group>
      </Stack>
    </Modal>
  );
}

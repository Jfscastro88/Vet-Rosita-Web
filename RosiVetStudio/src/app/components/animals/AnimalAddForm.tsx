"use client";
import { Button, Group, NumberInput, Select, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { animalSchema, type AnimalFormValues } from "@/lib/validators/animail";
import { mantineZodResolver } from "@/lib/validators/mantineZodResolver";
import { IconPlus } from "@tabler/icons-react";

export default function AnimalAddForm({ onAdd }: { onAdd: (v: AnimalFormValues) => void }) {
  const form = useForm<AnimalFormValues>({
    initialValues: { nome: "", eta: 0, sesso: "n", tipo: "cane", altro: "" },
    validate: mantineZodResolver(animalSchema),
  });

  return (
    <form
      onSubmit={form.onSubmit((vals) => {
        onAdd(vals);
        form.reset();
      })}
      noValidate
    >
      <Stack gap="md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <TextInput
              label="Specifica (Altro)"
              placeholder="es. coniglio, furetto..."
              {...form.getInputProps("altro")}
            />
          )}
        </div>
        <Group justify="end">
          <Button type="submit" leftSection={<IconPlus size={18} />}>
            Aggiungi
          </Button>
        </Group>
      </Stack>
    </form>
  );
}

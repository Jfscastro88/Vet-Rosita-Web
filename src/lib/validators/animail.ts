import { z } from "zod";

export const animalSchema = z
  .object({
    nome: z.string().min(1, "Nome obbligatorio"),
    eta: z.coerce.number().int().min(0, "Età non valida").max(80, "Età non valida"),
    sesso: z.enum(["m", "f", "n"], { message: "Seleziona sesso" }),
    tipo: z.enum(["cane", "gatto", "esotico", "topo", "cincillà", "altro"], {
      message: "Seleziona tipo",
    }),
    altro: z.string().optional(),
  })
  .superRefine((v, ctx) => {
    if (v.tipo === "altro" && !v.altro) {
      ctx.addIssue({ code: "custom", path: ["altro"], message: "Specifica il tipo" });
    }
  });

export type AnimalFormValues = z.infer<typeof animalSchema>;

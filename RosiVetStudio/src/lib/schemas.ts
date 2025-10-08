import { z } from "zod";

export const bookingSchema = z.object({
  // persona
  nome: z.string().min(1, "Obbligatorio"),
  cognome: z.string().min(1, "Obbligatorio"),
  dataNascita: z.date({ message: "Obbligatorio" }),
  sesso: z.enum(["f", "m", "ncb", "npd"]).optional(),
  telefono: z.string().min(6, "Inserisci un numero valido"),
  email: z.string().email("Email non valida"),
  confermaEmail: z.string().email("Email non valida"),
  // animale
  tipoAnimale: z.string().min(1, "Obbligatorio"),
  nomeAnimale: z.string().min(1, "Obbligatorio"),
  etaAnimale: z.number().int().nonnegative().optional(),
  infoParticolari: z.string().optional(),
  farmaci: z.string().optional(),
  // privacy
  consensoGdpr: z.boolean(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;

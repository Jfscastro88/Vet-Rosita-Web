import { z } from "zod";

export const bookingSchema = z
  .object({
    // persona
    nome: z.string().min(1, "Obbligatorio"),
    cognome: z.string().min(1, "Obbligatorio"),
    dataNascita: z.date({ message: "Obbligatorio" }).refine((date) => {
      const today = new Date();
      const age = today.getFullYear() - date.getFullYear();
      const monthDiff = today.getMonth() - date.getMonth();
      const dayDiff = today.getDate() - date.getDate();

      const exactAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;
      return exactAge >= 18;
    }, "Devi avere almeno 18 anni per prenotare"),
    sesso: z.enum(["f", "m", "ncb", "npd"]).optional(),
    telefono: z
      .string()
      .min(1, "Obbligatorio")
      .refine((val) => {
        const cleanPhone = val.replace(/\D/g, "");
        return cleanPhone.length === 10;
      }, "Il numero deve avere esattamente 10 cifre")
      .refine((val) => {
        const cleanPhone = val.replace(/\D/g, "");
        return cleanPhone.startsWith("3") || cleanPhone.startsWith("0");
      }, "Numero italiano non valido"),
    email: z.string().email("Email non valida"),
    confermaEmail: z.string().email("Email non valida"),
    // animale
    tipoAnimale: z.string().min(1, "Obbligatorio"),
    nomeAnimale: z.string().min(1, "Obbligatorio"),
    etaAnimale: z
      .number()
      .int("L'età deve essere un numero intero")
      .min(0, "L'età non può essere negativa")
      .max(50, "L'età massima è 50 anni")
      .optional(),
    infoParticolari: z.string().optional(),
    farmaci: z.string().optional(),
    // privacy
    consensoGdpr: z.boolean(),
    marketingOptIn: z.boolean().optional(),
  })
  .refine((data) => data.email === data.confermaEmail, {
    message: "Le email non coincidono",
    path: ["confermaEmail"],
  });

export type BookingFormData = z.infer<typeof bookingSchema>;

import { z } from "zod";

export const sessoOptions = ["f", "m", "ncb", "npd"] as const;
export type Sesso = (typeof sessoOptions)[number];

/* =========================REGISTER========================= */
export const registerSchema = z
  .object({
    nome: z.string().min(1, "Nome obbligatorio"),
    cognome: z.string().min(1, "Cognome obbligatorio"),

    dataNascita: z
      .preprocess((v) => (v === "" || v === null ? undefined : v), z.coerce.date())
      .refine((d) => d instanceof Date && !isNaN(d.getTime()), {
        message: "Data di nascita obbligatoria",
      })
      .refine((d) => d <= new Date(), {
        message: "La data non può essere nel futuro",
      })
      .refine(
        (d) => {
          const today = new Date();
          const age = today.getFullYear() - d.getFullYear();
          const monthDiff = today.getMonth() - d.getMonth();
          const dayDiff = today.getDate() - d.getDate();

          // Calculate exact age considering month and day
          const exactAge = age - (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? 1 : 0);
          return exactAge >= 18;
        },
        {
          message: "Devi avere almeno 18 anni per registrarti",
        }
      ),

    sesso: z.enum(sessoOptions, { message: "Seleziona il sesso" }),
    email: z.string().email("Email non valida"),
    confermaEmail: z.string().email("Email non valida"),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}\[\]:;"'<>,.?\/]).{8,}$/,
        "La password deve contenere almeno 8 caratteri, una maiuscola, una minuscola, un numero e un simbolo"
      ),
  })
  .refine((v) => v.email === v.confermaEmail, {
    path: ["confermaEmail"],
    message: "Le email non coincidono",
  });

export type RegisterValues = z.infer<typeof registerSchema>;

/* =========================LOGIN========================= */
export const loginSchema = z.object({
  email: z.string().email("Email non valida"),
  password: z.string().min(6, "Minimo 6 caratteri"),
  remember: z.boolean().default(true),
});

export type LoginValues = z.infer<typeof loginSchema>;

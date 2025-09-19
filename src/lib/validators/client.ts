import { z } from "zod";

export const PHONE_RE = /^[+\d][\d\s().-]{6,}$/;

const optionalDate = z
.preprocess((v) => (v == null || v === "" ? undefined : v), z.coerce.date())
.optional();

const optionalEmail = z
.preprocess((v) => (v === "" ? undefined : v), z.string().email("Email non valida"))
.optional();

/* ---- ADD ---- */
export const clientAddSchema = z
.object({
    iscrizione: z.string().min(1, "Numero iscrizione obbligatorio"),
    nome: z.string().min(1, "Nome obbligatorio"),
    cognome: z.string().min(1, "Cognome obbligatorio"),
    dataNascita: optionalDate,
    telefono: z.string().regex(PHONE_RE, "Telefono non valido"),
    sesso: z.enum(["f", "m", "ncb", "npd"], { message: "Seleziona il sesso" }),
    email: optionalEmail,
    confermaEmail: optionalEmail,
})
.superRefine((v, ctx) => {
    const hasAny = !!v.email || !!v.confermaEmail;
    if (hasAny && !v.email) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["email"], message: "Email obbligatoria" });
    }
    if (hasAny && !v.confermaEmail) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["confermaEmail"], message: "Conferma email obbligatoria" });
    }
    if (v.email && v.confermaEmail && v.email !== v.confermaEmail) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["confermaEmail"], message: "Le email non coincidono" });
    }
});

export type ClientAddValues = z.infer<typeof clientAddSchema>;

/* ---- UPDATE (profilo cliente) ---- */
export const clientUpdateSchema = z
.object({
    iscrizione: z.string().min(1, "Iscrizione obbligatoria"),
    nome: z.string().min(1, "Nome obbligatorio"),
    cognome: z.string().min(1, "Cognome obbligatorio"),
    dataNascita: optionalDate, // opzionale
    telefono: z.string().regex(PHONE_RE, "Telefono non valido"),
    sesso: z.enum(["f", "m", "ncb", "npd"], { message: "Seleziona il sesso" }),
    email: z.string().email("Email non valida").optional(),
    hasAccount: z.boolean(),
})
.superRefine((v, ctx) => {
    if (v.hasAccount && !v.email) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["email"],
            message: "Email obbligatoria (con account)",
        });
    }
});

export type ClientUpdateValues = z.infer<typeof clientUpdateSchema>;
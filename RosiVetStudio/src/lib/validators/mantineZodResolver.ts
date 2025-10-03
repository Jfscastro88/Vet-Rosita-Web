import type { ZodSchema } from "zod";
import type { ReactNode } from "react";

export function mantineZodResolver(schema: ZodSchema<Record<string, unknown>>) {
  return (values: unknown): Record<string, string | ReactNode> => {
    const parsed = schema.safeParse(values);
    if (parsed.success) return {};
    const out: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".") || "form";
      if (!out[key]) out[key] = issue.message;
    }
    return out;
  };
}

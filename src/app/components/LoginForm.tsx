"use client";

import { Stack, TextInput, PasswordInput, Checkbox, Button, Divider } from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import GoogleButton from "@/app/components/auth/GoogleButton";
import { loginSchema, LoginValues } from "@/lib/validators/auth";
import { mantineZodResolver } from "@/lib/validators/mantineZodResolver";

export default function LoginForm({
  onSubmit,
  onGoogle,
}: {
  onSubmit: (v: LoginValues) => void;
  onGoogle: () => void;
}) {
  const form = useForm<LoginValues>({
    initialValues: { email: "", password: "", remember: true },
    validate: mantineZodResolver(loginSchema),
  });

  return (
    <form onSubmit={form.onSubmit(onSubmit)} noValidate>
      <Stack gap="sm">
        <TextInput
          type="email"
          label="Email"
          placeholder="name@email.com"
          required
          withAsterisk
          autoComplete="email"
          {...form.getInputProps("email")}
        />

        <PasswordInput
          label="Password"
          placeholder="La tua password"
          required
          withAsterisk
          autoComplete="current-password"
          {...form.getInputProps("password")}
        />

        <Checkbox
          label="Ricordami"
          color="rgba(63, 140, 133, 1)"
          radius="xl"
          size="sm"
          {...form.getInputProps("remember", { type: "checkbox" })}
        />

        <Button type="submit" variant="filled" color="rgba(63, 140, 133, 1)" size="md" radius="xl">
          Accedi
        </Button>

        <Divider label="oppure" labelPosition="center" my="xs" />

        <GoogleButton onClick={onGoogle} />

        <div className="flex flex-col items-center gap-1 text-sm mt-2">
          <Link href="/forgot-password" className="text-blue-600 hover:underline">
            password dimenticata?
          </Link>
          <Link href="/register" className="text-blue-600 hover:underline">
            non hai un account? registrati
          </Link>
        </div>
      </Stack>
    </form>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import AuthCard from "@/app/components/auth/AuthCard";
import RegisterForm from "@/app/components/auth/RegisterForm";
import { registerUser } from "@/lib/auth";
import type { RegisterValues } from "@/lib/validators/auth";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(values: RegisterValues) {
    setLoading(true);

    try {
      const { user, error } = await registerUser(values);

      if (error) {
        notifications.show({
          title: "Errore di registrazione",
          message: error.message,
          color: "red",
        });
        return;
      }

      if (user) {
        notifications.show({
          title: "Registrazione riuscita",
          message: `Benvenuto, ${user.nome}! Controlla la tua email per verificare l'account.`,
          color: "green",
        });

        // Redirect to login or home page
        router.push("/login");
      }
    } catch (error) {
      notifications.show({
        title: "Errore",
        message: "Si è verificato un errore imprevisto",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard title="Registrazione">
      <RegisterForm onSubmit={onSubmit} loading={loading} />
    </AuthCard>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import AuthCard from "@/app/components/auth/AuthCard";
import LoginForm from "@/app/components/LoginForm";
import { loginUser, loginWithGoogle } from "@/lib/auth";
import type { LoginValues } from "@/lib/validators/auth";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(values: LoginValues) {
    setLoading(true);

    try {
      const { user, error } = await loginUser(values);

      if (error) {
        notifications.show({
          title: "Errore di accesso",
          message: error.message,
          color: "red",
        });
        return;
      }

      if (user) {
        notifications.show({
          title: "Accesso riuscito",
          message: `Benvenuto, ${user.nome}!`,
          color: "green",
        });

        // Redirect based on user role
        if (user.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/");
        }
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

  async function handleGoogle() {
    setLoading(true);

    try {
      const { error } = await loginWithGoogle();

      if (error) {
        notifications.show({
          title: "Errore Google",
          message: error.message,
          color: "red",
        });
      }
    } catch (error) {
      notifications.show({
        title: "Errore",
        message: "Login con Google fallito",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard title="Accedi">
      <LoginForm onSubmit={handleLogin} onGoogle={handleGoogle} loading={loading} />
    </AuthCard>
  );
}

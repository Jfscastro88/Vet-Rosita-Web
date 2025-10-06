"use client";

import AuthCard from "@/app/components/auth/AuthCard";
import LoginForm from "@/app/components/LoginForm";
import type { LoginValues } from "@/lib/validators/auth";

export default function LoginPage() {
  function handleLogin(values: LoginValues) {
    // TODO: integra con supabase.auth.signInWithPassword
  }

  function handleGoogle() {
    // TODO: integra con supabase.auth.signInWithOAuth({ provider: "google" })
  }

  return (
    <AuthCard title="Accedi">
      <LoginForm onSubmit={handleLogin} onGoogle={handleGoogle} />
    </AuthCard>
  );
}

"use client";

import AuthCard from "@/app/components/auth/AuthCard";
import RegisterForm from "@/app/components/auth/RegisterForm";
import type { RegisterValues } from "@/lib/validators/auth";

export default function RegisterPage() {
  function onSubmit(values: RegisterValues) {
    // TODO: integra con supabase.auth.signUp
  }
  return (
    <AuthCard title="Registrazione">
      <RegisterForm onSubmit={onSubmit} />
    </AuthCard>
  );
}

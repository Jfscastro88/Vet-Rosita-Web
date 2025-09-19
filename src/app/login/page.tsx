"use client";

import AuthCard from "@/app/components/auth/AuthCard";
import LoginForm from "@/app/components/LoginForm";
import type { LoginValues } from "@/lib/validators/auth";

export default function LoginPage() {
    function handleLogin(values: LoginValues) {
        console.log("Login values", values);
        alert("Login inviato (demo)");
        // TODO: integra con supabase.auth.signInWithPassword
    }
    
    function handleGoogle() {
        alert("Login con Google (demo)");
        // TODO: integra con supabase.auth.signInWithOAuth({ provider: "google" })
    }
    
    return (
        <AuthCard title="Accedi">
        <LoginForm onSubmit={handleLogin} onGoogle={handleGoogle} />
        </AuthCard>
    );
}
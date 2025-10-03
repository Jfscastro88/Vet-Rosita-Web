"use client";
import { Card, Stack, Group, Title, Button } from "@mantine/core";
import Link from "next/link";
import ClientForm from "@/app/components/clients/ClientForm";
import type { ClientAddValues } from "@/lib/validators/client";

export default function Page() {
    async function handleSubmit(values: ClientAddValues) {
        console.log("[add-client] submit", values);
        
        // Se c'è email → crea invito account, altrimenti solo record cliente
        // Esempio (Supabase, da collegare quando vuoi):
        // if (values.email) {
        //   await supabase.auth.admin.inviteUserByEmail(values.email, { redirectTo: "https://..." });
        // }
        // await supabase.from("clients").insert({ ...values });
        
        alert("Cliente creato (demo)");
    }
    
    return (
        <div className="min-h-screen bg-white text-gray-900 p-4 pt-24 sm:pt-28 flex items-start justify-center">
        <Card withBorder radius="lg" shadow="sm" className="w-full max-w-2xl">
        <Stack gap="md">
        <Group justify="space-between" align="center">
        <Title order={2}>Nuovo cliente</Title>
        <Button component={Link} href="/admin" variant="subtle">⟵ Torna al dashboard</Button>
        </Group>
        
        <ClientForm onSubmit={handleSubmit} />
        </Stack>
        </Card>
        </div>
    );
}
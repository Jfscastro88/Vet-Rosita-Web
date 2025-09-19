"use client";
import { Card, Stack, Title } from "@mantine/core";
import { ReactNode } from "react";

export default function AuthCard({ title, children, maxWidth = 420 }: {
    title: string; children: ReactNode; maxWidth?: number;
}) {
    return (
        <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center p-4">
        <Card shadow="sm" padding="xl" radius="lg" withBorder style={{ width: "100%", maxWidth }}>
        <Stack gap="md">
        <Title order={2} ta="center">{title}</Title>
        {children}
        </Stack>
        </Card>
        </div>
    );
}
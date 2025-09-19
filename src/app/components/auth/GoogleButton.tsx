"use client";
import { Button } from "@mantine/core";

export default function GoogleButton({ onClick }: { onClick: () => void }) {
    return (
        <Button variant="default" fullWidth radius="xl" size="md"
        leftSection={
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.9 32.4 29.4 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 3l5.7-5.7C33.5 6.1 28.9 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16.1 18.9 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C33.5 6.1 28.9 4 24 4 16 4 9 8.5 6.3 14.7z"/>
            <path fill="#4CAF50" d="M24 44c5.3 0 10.2-2 13.9-5.3l-6.4-5.2C29.3 35.5 26.8 36 24 36c-5.3 0-9.8-3.6-11.3-8.5l-6.5 5C9 39.5 16 44 24 44z"/>
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.4-4.2 6-8.3 6-5.3 0-9.8-3.6-11.3-8.5l-6.5 5C9 39.5 16 44 24 44c8 0 15-5.2 17.3-12.5.7-2.1 1.1-4.3 1.1-6.5 0-1.3-.1-2.7-.4-3.5z"/>
            </svg>
        }
        onClick={onClick}
        >
        entra con Google
        </Button>
    );
}
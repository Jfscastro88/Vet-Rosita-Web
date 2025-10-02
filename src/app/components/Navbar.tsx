"use client";

import React from "react";
import Link from "next/link";
import { Button, Group, Paper } from "@mantine/core";

export type NavbarProps = {
  isAuthenticated?: boolean;
  onLogout?: () => void;
};

export default function Navbar({ isAuthenticated, onLogout }: NavbarProps) {
  return (
    <div className="fixed left-1/2 -translate-x-1/2 top-4 z-50 w-[90vw] sm:w-[70vw]">
      <Paper
        shadow="md"
        radius="xl"
        withBorder
        className="mx-auto group transition-all duration-700 ease-out w-[40vw] hover:w-[60vw] max-w-[1000px] min-w-[280px] backdrop-blur bg-white/80 text-gray-900"
      >
        <nav className="px-3 py-2">
          <Group justify="center" gap="xs" wrap="nowrap">
            <Link
              href="/"
              className="px-3 py-1 rounded-full transition-transform duration-300 hover:scale-105 active:scale-95"
            >
              Home
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="px-3 py-1 rounded-full transition-transform duration-300 hover:scale-105 active:scale-95"
                >
                  Dashboard
                </Link>
                <Button size="xs" variant="light" onClick={onLogout} className="px-3 rounded-full">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-3 py-1 rounded-full transition-transform duration-300 hover:scale-105 active:scale-95"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-3 py-1 rounded-full transition-transform duration-300 hover:scale-105 active:scale-95"
                >
                  Register
                </Link>
              </>
            )}
          </Group>
        </nav>
      </Paper>
    </div>
  );
}

export function NavbarClient() {
  // TODO: qui legge lo stato auth dal client (es: Supabase, cookie, Zustand, ecc.)
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const handleLogout = React.useCallback(() => {
    // TODO: integra supabase.auth.signOut() o la tua API
    alert("Logout (demo)");
    setIsAuthenticated(false);
  }, []);

  return <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />;
}

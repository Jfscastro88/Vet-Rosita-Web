"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Group,
  Stack,
  Button,
  Container,
  Text,
  Box,
  Divider,
  useMantineTheme,
} from "@mantine/core";
import { IconUser, IconSettings, IconLogout } from "@tabler/icons-react";
import { supabase } from "@/lib/supabaseClient";

const links = [
  { label: "Home", href: "/" },
  { label: "Servizi", href: "/services" },
  { label: "Chi Siamo", href: "/about" },
  { label: "Prenota", href: "/book" },
];

export default function Footer() {
  const pathname = usePathname();
  const theme = useMantineTheme();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is authenticated
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    checkUser();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <Box
      style={{
        backgroundColor: theme.colors.gray[0],
        borderTop: `1px solid ${theme.colors.gray[2]}`,
        padding: theme.spacing.md,
        marginTop: "auto",
      }}
    >
      <Container size="xl">
        <Stack gap="sm">
          {/* Navigation Links */}
          <Group justify="center" gap="md" wrap="wrap">
            {links.map((link) => (
              <Link key={link.href} href={link.href} style={{ textDecoration: "none" }}>
                <Button
                  variant="subtle"
                  color="pink"
                  size="xs"
                  style={{
                    backgroundColor: pathname === link.href ? theme.colors.pink[1] : "transparent",
                    color: pathname === link.href ? theme.colors.pink[7] : theme.colors.gray[6],
                  }}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </Group>

          <Divider />

          {/* Authentication Section */}
          <Group justify="center" gap="sm">
            {user ? (
              <>
                <Link href="/admin" style={{ textDecoration: "none" }}>
                  <Button
                    variant={pathname.startsWith("/admin") ? "filled" : "subtle"}
                    color="pink"
                    size="xs"
                    leftSection={<IconSettings size={14} />}
                  >
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="subtle"
                  color="pink"
                  size="xs"
                  leftSection={<IconLogout size={14} />}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/login" style={{ textDecoration: "none" }}>
                <Button variant="light" color="pink" size="xs">
                  Login
                </Button>
              </Link>
            )}
          </Group>

          {/* Copyright */}
          <Text size="xs" c="dimmed" ta="center">
            © {new Date().getFullYear()} RosiVetStudio. Tutti i diritti riservati.
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}

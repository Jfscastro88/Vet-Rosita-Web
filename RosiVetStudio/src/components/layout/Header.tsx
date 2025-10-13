"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AppShell,
  Group,
  Stack,
  Burger,
  Title,
  Button,
  Container,
  Menu,
  UnstyledButton,
  Text,
  Box,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconUser, IconSettings } from "@tabler/icons-react";
import { supabase } from "@/lib/supabaseClient";

const links = [
  { label: "Home", href: "/" },
  { label: "Servizi", href: "/services" },
  { label: "Chi Siamo", href: "/about" },
  { label: "Prenota", href: "/book" },
];

export default function Header() {
  const [opened, { toggle }] = useDisclosure();
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

  return (
    <AppShell.Header>
      <Container size="xl" h="100%">
        <Group h="100%" justify="space-between">
          <Link href="/" style={{ textDecoration: "none" }}>
            <Title order={2} c="pink.6" fw={700}>
              RosiVetStudio
            </Title>
          </Link>
          <Group gap="xl" visibleFrom="sm">
            {links.map((link) => (
              <Link key={link.href} href={link.href} style={{ textDecoration: "none" }}>
                <Button
                  variant={pathname === link.href ? "filled" : "subtle"}
                  color="pink"
                  size="sm"
                >
                  {link.label}
                </Button>
              </Link>
            ))}

            {user && (
              <Link href="/admin" style={{ textDecoration: "none" }}>
                <Button
                  variant={pathname.startsWith("/admin") ? "filled" : "subtle"}
                  color="pink"
                  size="sm"
                  leftSection={<IconSettings size={16} />}
                >
                  Dashboard
                </Button>
              </Link>
            )}
          </Group>

          {/* Mobile Menu */}
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
            color={theme.colors.pink[6]}
          />
        </Group>
      </Container>

      {/* Mobile Navigation Menu */}
      {opened && (
        <Box
          style={{
            position: "fixed",
            top: 60,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: theme.colors.gray[0],
            borderTop: `1px solid ${theme.colors.gray[2]}`,
            zIndex: 1000,
            padding: theme.spacing.md,
          }}
        >
          <Stack gap="sm">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ textDecoration: "none", width: "100%" }}
                onClick={() => toggle()}
              >
                <Button
                  variant={pathname === link.href ? "filled" : "subtle"}
                  color="pink"
                  size="md"
                  fullWidth
                  justify="flex-start"
                >
                  {link.label}
                </Button>
              </Link>
            ))}
            {user && (
              <Link
                href="/admin"
                style={{ textDecoration: "none", width: "100%" }}
                onClick={() => toggle()}
              >
                <Button
                  variant={pathname.startsWith("/admin") ? "filled" : "subtle"}
                  color="pink"
                  size="md"
                  fullWidth
                  justify="flex-start"
                  leftSection={<IconSettings size={16} />}
                >
                  Dashboard
                </Button>
              </Link>
            )}
          </Stack>
        </Box>
      )}
    </AppShell.Header>
  );
}

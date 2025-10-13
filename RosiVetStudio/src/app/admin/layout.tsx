"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Loader, Text, Center } from "@mantine/core";
import { supabase } from "@/lib/supabaseClient";
import AdminNavbar from "@/components/admin/AdminNavbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          // No user found, redirect to login
          router.push("/login");
          return;
        }

        setUser(user);
      } catch (error) {
        console.error("Auth check failed:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        router.push("/login");
      } else {
        setUser(session?.user ?? null);
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <Center style={{ height: "100vh" }}>
        <div style={{ textAlign: "center" }}>
          <Loader size="lg" />
          <Text mt="md">Verificando accesso...</Text>
        </div>
      </Center>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <main className="py-6">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}

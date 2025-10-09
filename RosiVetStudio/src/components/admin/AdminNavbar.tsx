"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

const navItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Appuntamenti", href: "/admin/appointments" },
  { label: "Clienti", href: "/admin/clients" },
  { label: "Animali", href: "/admin/pets" },
];

export default function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", error.message);
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error("Unexpected error during logout:", error);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">Rosi Vet Studio</h1>
            <span className="ml-2 text-sm text-gray-500">Admin</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-red-100 text-red-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden py-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-red-100 text-red-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

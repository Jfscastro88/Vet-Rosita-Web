import AdminNavbar from "@/components/admin/AdminNavbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <main className="py-6">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}

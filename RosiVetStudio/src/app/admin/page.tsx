import { BlockTimeManager } from "@/components/admin/BlockTimeManager";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <h1 className="text-3xl font-bold text-center text-gray-900">Dashboard Amministratore</h1>

          <div className="bg-white shadow-sm rounded-lg border">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Gestione Orari</h2>
            </div>
            <div className="p-6">
              <BlockTimeManager />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

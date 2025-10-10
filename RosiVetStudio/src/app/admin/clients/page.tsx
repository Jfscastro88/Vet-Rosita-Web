import ClientsTable from "@/components/admin/ClientsTable";

export default function AdminClientsPage() {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-center mb-2">Gestione Clienti</h1>
        <p className="text-gray-600 text-center">
          Visualizza e gestisci tutti i clienti con filtri avanzati e ricerca.
        </p>
      </div>
      <ClientsTable />
    </div>
  );
}

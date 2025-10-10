import PetsTable from "@/components/admin/PetsTable";

export default function AdminPetsPage() {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-center mb-2">Gestione Animali</h1>
        <p className="text-gray-600 text-center">
          Visualizza e gestisci tutti gli animali con filtri avanzati e ricerca.
        </p>
      </div>
      <PetsTable />
    </div>
  );
}

import AppointmentsTable from "@/components/admin/AppointmentsTable";

export default function AdminAppointmentsPage() {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-center mb-2">Gestione Appuntamenti</h1>
        <p className="text-gray-600 text-center">
          Visualizza e gestisci tutti gli appuntamenti con filtri avanzati e ricerca.
        </p>
      </div>
      <AppointmentsTable />
    </div>
  );
}

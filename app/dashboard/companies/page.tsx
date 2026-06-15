import { CompaniesTable } from "@/features/companies/components/companies-table";

export default function CompaniesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Compañías
        </h1>

        <p className="text-slate-500">
          Administración de compañías
        </p>
      </div>

      <CompaniesTable />
    </div>
  );
}
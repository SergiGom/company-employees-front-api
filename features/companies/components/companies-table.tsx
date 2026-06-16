"use client";

import { useMemo, useState } from "react";
import { SearchInput } from "@/components/ui/search-input";

import { Company } from "../types/company.types";

import { useCompanies } from "../hooks/use-companies";
import { useCreateCompany } from "../hooks/use-create-company";
import { useUpdateCompany } from "../hooks/use-update-company";
import { useDeleteCompany } from "../hooks/use-delete-company";
import { EmptyState } from "@/components/ui/empty-state";
import { CompanyModal } from "./company-modal";

import { getCompanyEmployees } from "../api/companies.api";

import { CompanyEmployeesModal } from "./company-employees-modal";


export function CompaniesTable() {
  const { data, isLoading } =
    useCompanies();

  const createMutation =
    useCreateCompany();

  const updateMutation =
    useUpdateCompany();

  const deleteMutation =
    useDeleteCompany();

  const [open, setOpen] =
    useState(false);

  const [selectedCompany, setSelectedCompany] =
    useState<Company | null>(null);

    const [search, setSearch] =
  useState("");

  const [
  employeesModalOpen,
  setEmployeesModalOpen,
] = useState(false);

const [
  companyEmployees,
  setCompanyEmployees,
] = useState([]);

const [
  companyName,
  setCompanyName,
] = useState("");

  const handleCreate = async (
    values: any
  ) => {
    await createMutation.mutateAsync(
      values
    );

    setOpen(false);
  };

  const handleUpdate = async (
    values: any
  ) => {
    if (!selectedCompany) return;

    await updateMutation.mutateAsync({
      id: selectedCompany.id,
      data: values,
    });

    setOpen(false);

    setSelectedCompany(null);
  };

  const handleDelete = async (
    id: number
  ) => {
    const confirmed =
      confirm(
        "¿Eliminar esta compañía?"
      );

    if (!confirmed) return;

    await deleteMutation.mutateAsync(
      id
    );
  };

  const handleViewEmployees =
  async (
    companyId: number,
    name: string
  ) => {
    const response =
      await getCompanyEmployees(
        companyId
      );

    setCompanyEmployees(
      response.data
    );

    setCompanyName(name);

    setEmployeesModalOpen(
      true
    );
  };

  const filteredCompanies =
  useMemo(() => {
    return (
      data?.data.filter(
        (company) =>
          company.nombre
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          company.direccion
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      ) ?? []
    );
  }, [data, search]);

  if (isLoading) {
    return (
      <div>
        Cargando compañías...
      </div>
    );
  }

  if (!data?.data.length) {
  return (
    <EmptyState
      title="Sin compañías"
      description="No existen compañías registradas"
    />
  );
}

  return (
    <>

    <div className="mb-4">
  <SearchInput
    value={search}
    onChange={setSearch}
    placeholder="Search companies..."
  />
</div>
      <div className="mb-6 flex justify-end">
        <button
          onClick={() => {
            setSelectedCompany(null);
            setOpen(true);
          }}
          className="rounded-lg bg-slate-900 px-4 py-2 text-white"
        >
          Nueva compañía
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50">
              <th className="p-4 text-left">
                ID
              </th>

              <th className="p-4 text-left">
                Nombre
              </th>

              <th className="p-4 text-left">
                Dirección
              </th>

              <th className="p-4 text-left">
                Teléfono
              </th>

              <th className="p-4 text-left">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody>
  {filteredCompanies.map(
    (company) => (
      <tr
        key={company.id}
        className="border-t"
      >
        <td className="p-4">
          {company.id}
        </td>

        <td className="p-4">
          {company.nombre}
        </td>

        <td className="p-4">
          {company.direccion}
        </td>

        <td className="p-4">
          {company.telefono}
        </td>

        <td className="p-4">
          <div className="flex gap-2">
            <button
              onClick={() => {
                setSelectedCompany(
                  company
                );

                setOpen(true);
              }}
              className="rounded bg-blue-500 px-3 py-1 text-white"
            >
              Editar
            </button>

            <button
              onClick={() =>
                handleDelete(
                  company.id
                )
              }
              className="rounded bg-red-500 px-3 py-1 text-white"
            >
              Eliminar

              
            </button>

            <button
  onClick={() =>
    handleViewEmployees(
      company.id,
      company.nombre
    )
  }
  className="rounded bg-slate-700 px-3 py-1 text-white"
>
  Empleados
</button>
          </div>
        </td>
      </tr>
    )
  )}
</tbody>
        </table>
      </div>

      <CompanyModal
        open={open}
        title={
          selectedCompany
            ? "Editar compañía"
            : "Nueva compañía"
        }
        company={selectedCompany}
        isLoading={
          createMutation.isPending ||
          updateMutation.isPending
        }
        onClose={() => {
          setOpen(false);
          setSelectedCompany(null);
        }}
        onSubmit={
          selectedCompany
            ? handleUpdate
            : handleCreate
        }
      />
      <CompanyEmployeesModal
  open={employeesModalOpen}
  companyName={companyName}
  employees={companyEmployees}
  onClose={() =>
    setEmployeesModalOpen(
      false
    )
  }
/>
    </>
  );
}
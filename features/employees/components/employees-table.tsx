"use client";

import {
  useEffect,
  useState,
} from "react";

import { Employee } from "../types/employee.types";

import { useEmployees } from "../hooks/use-employees";
import { useCreateEmployee } from "../hooks/use-create-employee";
import { useUpdateEmployee } from "../hooks/use-update-employee";
import { useDeleteEmployee } from "../hooks/use-delete-employee";

import { EmptyState } from "@/components/ui/empty-state";
import { EmployeeModal } from "./employee-modal";
import { SearchInput } from "@/components/ui/search-input";
import { Pagination } from "@/components/ui/pagination";
import { useDebounce } from "@/hooks/use-debounce";

export function EmployeesTable() {
  const [page, setPage] =
    useState(1);

  const [search, setSearch] =
    useState("");

    const debouncedSearch =
  useDebounce(
    search,
    500
  );

  const size = 10;

 useEffect(() => {
  setPage(1);
}, [debouncedSearch]);

  const { data, isLoading } =
    useEmployees(
      page,
      size,
      debouncedSearch
    );

  const createMutation =
    useCreateEmployee();

  const updateMutation =
    useUpdateEmployee();

  const deleteMutation =
    useDeleteEmployee();

  const [open, setOpen] =
    useState(false);

  const [
    selectedEmployee,
    setSelectedEmployee,
  ] = useState<Employee | null>(
    null
  );

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
    if (!selectedEmployee) return;

    await updateMutation.mutateAsync({
      id: selectedEmployee.id,
      data: values,
    });

    setOpen(false);

    setSelectedEmployee(null);
  };

  const handleDelete = async (
    id: number
  ) => {
    if (
      !confirm(
        "¿Eliminar empleado?"
      )
    )
      return;

    await deleteMutation.mutateAsync(
      id
    );
  };

  if (isLoading) {
    return (
      <div>
        Cargando empleados...
      </div>
    );
  }

  if (
    !search &&
    !data?.data.length
  ) {
    return (
      <EmptyState
        title="Sin empleados"
        description="No existen empleados registrados"
      />
    );
  }

  return (
    <>
      <div className="mb-4">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search employees..."
        />
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div>
          {search && (
            <p className="text-sm text-slate-500">
              Results found:{" "}
              {data?.total ?? 0}
            </p>
          )}
        </div>

        <button
          onClick={() => {
            setSelectedEmployee(
              null
            );

            setOpen(true);
          }}
          className="rounded-lg bg-slate-900 px-4 py-2 text-white"
        >
          Nuevo empleado
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border bg-white">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50">
              <th className="p-4 text-left">
                Nombre
              </th>

              <th className="p-4 text-left">
                Cargo
              </th>

              <th className="p-4 text-left">
                Correo
              </th>

              <th className="p-4 text-left">
                Salario
              </th>

              <th className="p-4 text-left">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody>
            {(data?.data?.length ??
              0) === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="p-10 text-center text-slate-500"
                >
                  No se encontraron
                  empleados
                </td>
              </tr>
            ) : (
              data?.data.map(
                (employee) => (
                  <tr
                    key={employee.id}
                    className="border-t"
                  >
                    <td className="p-4">
                      {
                        employee.nombre
                      }{" "}
                      {
                        employee.apellido
                      }
                    </td>

                    <td className="p-4">
                      {employee.cargo}
                    </td>

                    <td className="p-4">
                      {employee.correo}
                    </td>

                    <td className="p-4">
                      $
                      {employee.salario.toLocaleString()}
                    </td>

                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedEmployee(
                              employee
                            );

                            setOpen(
                              true
                            );
                          }}
                          className="rounded bg-blue-500 px-3 py-1 text-white"
                        >
                          Editar
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(
                              employee.id
                            )
                          }
                          className="rounded bg-red-500 px-3 py-1 text-white"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>

      {(data?.totalPages ??
        0) > 1 && (
        <Pagination
          page={page}
          totalPages={
            data?.totalPages ??
            1
          }
          onPageChange={
            setPage
          }
        />
      )}

      <EmployeeModal
        open={open}
        title={
          selectedEmployee
            ? "Editar empleado"
            : "Nuevo empleado"
        }
        employee={
          selectedEmployee
        }
        isLoading={
          createMutation.isPending ||
          updateMutation.isPending
        }
        onClose={() => {
          setOpen(false);

          setSelectedEmployee(
            null
          );
        }}
        onSubmit={
          selectedEmployee
            ? handleUpdate
            : handleCreate
        }
      />
    </>
  );
}
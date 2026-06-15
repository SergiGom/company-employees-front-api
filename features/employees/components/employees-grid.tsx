"use client";

import {
  IgrGrid,
  IgrColumn,
} from "igniteui-react-grids";

import { Employee } from "../types/employee.types";

interface Props {
  employees: Employee[];
}

export function EmployeesGrid({
  employees,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-4">
      <IgrGrid
        data={employees}
        primaryKey="id"
        autoGenerate={false}
        style={{
          height: "600px",
          width: "100%",
        }}
      >
        <IgrColumn
          field="id"
          header="ID"
        />

        <IgrColumn
          field="nombre"
          header="Nombre"
        />

        <IgrColumn
          field="apellido"
          header="Apellido"
        />

        <IgrColumn
          field="correo"
          header="Correo"
        />

        <IgrColumn
          field="cargo"
          header="Cargo"
        />

        <IgrColumn
          field="salario"
          header="Salario"
        />

        <IgrColumn
          field="companiaId"
          header="Compañía"
        />
      </IgrGrid>
    </div>
  );
}
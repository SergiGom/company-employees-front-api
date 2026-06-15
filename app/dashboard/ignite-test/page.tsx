"use client";

import {
  IgrGrid,
  IgrColumn,
} from "igniteui-react-grids";

const data = [
  {
    id: 1,
    nombre: "Samuel",
    cargo: "Backend",
  },
  {
    id: 2,
    nombre: "Carlos",
    cargo: "Frontend",
  },
];

export default function IgniteTestPage() {
  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">
        Ignite Test
      </h1>

      <IgrGrid data={data}>
        <IgrColumn field="id" />
        <IgrColumn field="nombre" />
        <IgrColumn field="cargo" />
      </IgrGrid>
    </div>
  );
}
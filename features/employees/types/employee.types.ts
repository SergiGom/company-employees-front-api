export interface Employee {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  cargo: string;
  salario: number;
  companiaId: number;
}

export interface CreateEmployeeDto {
  nombre: string;
  apellido: string;
  correo: string;
  cargo: string;
  salario: number;
  companiaId: number;
}

export interface UpdateEmployeeDto {
  nombre?: string;
  apellido?: string;
  correo?: string;
  cargo?: string;
  salario?: number;
  companiaId?: number;
}   
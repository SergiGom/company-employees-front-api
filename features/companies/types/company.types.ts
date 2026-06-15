export interface Company {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  fechaCreacion: string;
}

export interface CreateCompanyDto {
  nombre: string;
  direccion: string;
  telefono: string;
}

export interface UpdateCompanyDto {
  nombre?: string;
  direccion?: string;
  telefono?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  size: number;
  total: number;
  totalPages: number;
}
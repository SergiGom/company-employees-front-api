export interface Company {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  fechaCreacion: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  size: number;
  total: number;
  totalPages: number;
}
import { api } from "@/lib/api";

import {
  Company,
  CreateCompanyDto,
  UpdateCompanyDto,
  PaginatedResponse,
} from "../types/company.types";

export async function getCompanies(
  page = 1,
  size = 10
) {
  const response =
    await api.get<
      PaginatedResponse<Company>
    >(
      `/companies?page=${page}&size=${size}`
    );

  return response.data;
}

export async function createCompany(
  data: CreateCompanyDto
) {
  const response =
    await api.post(
      "/companies",
      data
    );

  return response.data;
}

export async function updateCompany(
  id: number,
  data: UpdateCompanyDto
) {
  const response =
    await api.put(
      `/companies/${id}`,
      data
    );

  return response.data;
}

export async function deleteCompany(
  id: number
) {
  await api.delete(
    `/companies/${id}`
  );
}
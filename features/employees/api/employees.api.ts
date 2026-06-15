import { api } from "@/lib/api";

import {
  Employee,
  CreateEmployeeDto,
  UpdateEmployeeDto,
} from "../types/employee.types";

import { PaginatedResponse } from "@/features/companies/types/company.types";

export async function getEmployees(
  page = 1,
  size = 10,
  search = ""
) {
  const response =
    await api.get<
      PaginatedResponse<Employee>
    >(
      `/employees?page=${page}&size=${size}&search=${search}&orderBy=id&direction=asc`
    );

  return response.data;
}

export async function createEmployee(
  data: CreateEmployeeDto
) {
  const response =
    await api.post(
      "/employees",
      data
    );

  return response.data;
}

export async function updateEmployee(
  id: number,
  data: UpdateEmployeeDto
) {
  const response =
    await api.patch(
      `/employees/${id}`,
      data
    );

  return response.data;
}

export async function deleteEmployee(
  id: number
) {
  await api.delete(
    `/employees/${id}`
  );
}
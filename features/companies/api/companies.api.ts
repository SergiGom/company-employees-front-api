import { api } from "@/lib/api";

import {
  Company,
  PaginatedResponse,
} from "../types/company.types";

export async function getCompanies() {
  const response =
    await api.get<PaginatedResponse<Company>>(
      "/companies"
    );

  return response.data;
}
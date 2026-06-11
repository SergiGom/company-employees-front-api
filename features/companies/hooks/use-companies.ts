"use client";

import { useQuery } from "@tanstack/react-query";

import { getCompanies } from "../api/companies.api";

export function useCompanies() {
  return useQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
  });
}
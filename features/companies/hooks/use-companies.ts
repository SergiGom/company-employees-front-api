"use client";

import { useQuery } from "@tanstack/react-query";

import { getCompanies } from "../api/companies.api";

export function useCompanies(
  page = 1,
  size = 10
) {
  return useQuery({
    queryKey: [
      "companies",
      page,
      size,
    ],

    queryFn: () =>
      getCompanies(page, size),
  });
}
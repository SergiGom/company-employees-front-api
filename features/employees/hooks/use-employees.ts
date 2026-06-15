"use client";

import { useQuery } from "@tanstack/react-query";

import { getEmployees } from "../api/employees.api";

export function useEmployees(
  page = 1,
  size = 10,
  search = ""
) {
  return useQuery({
    queryKey: [
      "employees",
      page,
      size,
      search,
    ],

    queryFn: () =>
      getEmployees(
        page,
        size,
        search
      ),
  });
}
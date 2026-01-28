import { useMemo } from "react";
import type { EmergencyCasePayload } from "../types/emergencyCase";

interface Props {
  allCases: EmergencyCasePayload[];
  filters?: {
    id?: number;
  };
}

export function filteredCasesByIdDecending({ allCases, filters }: Props) {
  return useMemo(() => {
    const idFilter = filters?.id ? Number(filters.id) : undefined;
    return allCases
      .filter((c) => (idFilter ? Number(c.id) === idFilter : true))
      .sort((a, b) => {
        const aId = Number(a.id ?? 0);
        const bId = Number(b.id ?? 0);
        return bId - aId;
      });
  }, [allCases, filters]);
}

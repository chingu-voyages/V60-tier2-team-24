import { useEffect, useMemo, useState } from "react";

import {
  APPLICATION_STATUSES,
  ApplicationStatus,
} from "@/constants/applicationStatus";
import { Application } from "@/utils/dataWrapper";
import { LocalStorage } from "@/utils/localStorage";

const ALL_STATUSES = Object.values(APPLICATION_STATUSES) as ApplicationStatus[];
const FILTER_STORAGE_KEY = "applications-status-filter";

const getSavedStatuses = (): ApplicationStatus[] => {
  const savedStatuses = LocalStorage.get(FILTER_STORAGE_KEY);
  if (!Array.isArray(savedStatuses)) return [];

  return savedStatuses.filter((status) => ALL_STATUSES.includes(status));
};

export function useApplicationStatusFilter(applications: Application[]) {
  const [selectedStatuses, setSelectedStatuses] =
    useState<ApplicationStatus[]>(getSavedStatuses);

  useEffect(() => {
    LocalStorage.set(FILTER_STORAGE_KEY, selectedStatuses);
  }, [selectedStatuses]);

  const toggleStatus = (status: ApplicationStatus) => {
    setSelectedStatuses((prev) => {
      if (prev.includes(status)) {
        return prev.filter((value) => value !== status);
      }
      return [...prev, status];
    });
  };

  const filteredApplications = useMemo(() => {
    if (selectedStatuses.length === 0) {
      return applications;
    }

    return applications.filter((application) =>
      selectedStatuses.includes(application.Status as ApplicationStatus),
    );
  }, [applications, selectedStatuses]);

  return {
    selectedStatuses,
    filteredApplications,
    toggleStatus,
  };
}

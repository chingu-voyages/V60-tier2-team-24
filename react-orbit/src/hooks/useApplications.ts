import { Application, LocalStorage } from "@/utils/localStorage";
import { useEffect, useState } from "react";

export function useApplications() {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const storedApplications = LocalStorage.get("applications");
    setApplications(storedApplications || []);
  }, []);

  const addApplication = (application: Application) => {
    const updatedApplications = [...applications, application];
    LocalStorage.set("applications", updatedApplications);
    setApplications(updatedApplications);
  };

  const updateApplication = (index: number, application: Application) => {
    const updatedApplications = LocalStorage.updateApplication(
      index,
      application,
    );
    if (updatedApplications) {
      setApplications(updatedApplications);
    }
  };

  const removeApplication = (index: number) => {
    const updatedApplications = LocalStorage.removeApplication(index);
    if (updatedApplications) {
      setApplications(updatedApplications);
    }
  };

  return {
    applications,
    setApplications,
    addApplication,
    updateApplication,
    removeApplication,
  };
}

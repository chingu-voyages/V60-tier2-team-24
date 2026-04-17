import { Application, LocalStorage } from "@/utils/localStorage";
import { useEffect, useState } from "react";

export function useApplications() {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const fetchApplications = async () => {
    try {
      const apps = await LocalStorage.getApplications();
      setApplications(apps || []);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    }
  };

  fetchApplications();
  }, []);

  const addApplication = async (application: Application) => {
    try {
    const newApp = await LocalStorage.addApplication(application);

    // Update UI optimistically
    setApplications((prev) => [...prev, newApp]);
  } catch (error) {
    console.error("Failed to add application:", error);
  }
  };

  const updateApplication = async (index: number, application: Partial<Application>) => {
    try {
      const updatedApplications = await LocalStorage.updateApplication(
      index,
      application,
    );

    if (updatedApplications) {
      setApplications(updatedApplications);
    }
    } catch (error) {
      console.error('Failed to update application:', error);
    }
  };

  const removeApplication = async (index: number) => {
    try {
      const updatedApplications = await LocalStorage.removeApplication(index);
    if (updatedApplications) {
      setApplications(updatedApplications);
    }
    } catch (error) {
      console.error('Failed to remove application:', error);
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

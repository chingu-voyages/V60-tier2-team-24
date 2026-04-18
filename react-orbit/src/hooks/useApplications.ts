import { ApplicationInput } from "@/lib/application";
import { Application, dataWrapper } from "@/utils/dataWrapper";
import { useEffect, useState } from "react";

export function useApplications() {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const apps = await dataWrapper.getApplications();
        console.log("Fetched apps:", apps);
        setApplications(apps || []);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      }
    };

    fetchApplications();
  }, []);

  const addApplication = async (application: ApplicationInput) => {
    try {
      const newApp = await dataWrapper.addApplication(application);
      console.log("Added app:", newApp);

      // Update UI optimistically
      setApplications((prev) => [...prev, newApp]);
    } catch (error) {
      console.error("Failed to add application:", error);
      throw error;
    }
  };

  const updateApplication = async (
    id: string,
    application: Partial<Application>,
  ) => {
    try {
      console.log("Updating ID:", id);
      const updatedApplications = await dataWrapper.updateApplication(
        id,
        application,
      );

      if (updatedApplications) {
        setApplications(updatedApplications);
      }
    } catch (error) {
      console.error("Failed to update application:", error);
      throw error;
    }
  };

  const removeApplication = async (id: string) => {
    try {
      console.log("Deleting ID:", id);
      const updatedApplications = await dataWrapper.removeApplication(id);
      if (updatedApplications) {
        setApplications(updatedApplications);
      }
    } catch (error) {
      console.error("Failed to remove application:", error);
      throw error;
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

import { ApplicationInput } from "@/lib/application";
import { Application, dataWrapper } from "@/utils/dataWrapper";
import { useEffect, useState } from "react";

export function useApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      setError(null);
      try {
        const apps = await dataWrapper.getApplications();
        setApplications(apps || []);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
        setError("Failed to fetch applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const addApplication = async (application: ApplicationInput) => {
    try {
      const newApp = await dataWrapper.addApplication(application);

      // Update UI optimistically
      setApplications((prev) => [...prev, newApp]);
    } catch (error) {
      console.error("Failed to add application:", error);
      throw error;
    }
  };

  const updateApplication = async (
    id: string,
    application: Partial<ApplicationInput>,
  ) => {
    const previous = applications;
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, ...application } : app)),
    );
    try {
      await dataWrapper.updateApplication(id, application);
    } catch (error) {
      setApplications(previous);
      console.error("Failed to update application:", error);
      throw error;
    }
  };

  const removeApplication = async (id: string) => {
    const previous = applications;
    setApplications((prev) => prev.filter((app) => app.id !== id));
    try {
      await dataWrapper.removeApplication(id);
    } catch (error) {
      setApplications(previous);
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
    loading,
    error,
  };
}

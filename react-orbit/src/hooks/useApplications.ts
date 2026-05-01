import { useAuth } from "@/context/AuthContext";
import { ApplicationInput } from "@/lib/application";
import { Application, dataWrapper } from "@/utils/dataWrapper";
import { useEffect, useState } from "react";

export function useApplications() {
  const { user } = useAuth();
  const userId = user?.uid ?? null;
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setApplications([]);
      setLoading(false);
      return;
    }

    let ignore = false;

    const fetchApplications = async () => {
      setLoading(true);
      setError(null);
      try {
        const apps = await dataWrapper.getApplications(userId);
        if (!ignore) setApplications(apps || []);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
        if (!ignore) setError("Failed to fetch applications");
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchApplications();

    return () => {
      ignore = true;
    };
  }, [userId]);

  const addApplication = async (application: ApplicationInput) => {
    if (!userId) throw new Error("You must be signed in to add applications.");

    try {
      const newApp = await dataWrapper.addApplication(userId, application);

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
    if (!userId) {
      throw new Error("You must be signed in to update applications.");
    }

    const previous = applications;
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, ...application } : app)),
    );
    try {
      await dataWrapper.updateApplication(userId, id, application);
    } catch (error) {
      setApplications(previous);
      console.error("Failed to update application:", error);
      throw error;
    }
  };

  const removeApplication = async (id: string) => {
    if (!userId) {
      throw new Error("You must be signed in to remove applications.");
    }

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

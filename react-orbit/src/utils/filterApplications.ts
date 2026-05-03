import { Application } from "./dataWrapper";

export function filterApplications(applications: Application[], searchTerm: string) {
  if (!searchTerm.trim()) return applications;

  const query = searchTerm.toLowerCase();
  return applications.filter((app) =>
    app.CompanyName.toLowerCase().includes(query) ||
    app.Role.toLowerCase().includes(query) ||
    app.Status.toLowerCase().includes(query) ||
    app.Location.toLowerCase().includes(query)
  );
}
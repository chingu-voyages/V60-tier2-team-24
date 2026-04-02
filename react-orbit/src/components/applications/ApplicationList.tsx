import { LocalStorage } from "@/utils/localStorage";
import EmptyState from "./EmptyState";
import ApplicationCard from "./ApplicationCard";

function ApplicationList() {
  // Switch to state when form is integrated
  const applications = LocalStorage.get("applications") || [];

  if (applications.length === 0) {
    return <EmptyState />;
  }
  return (
    <div className="grid gap-4">
      {applications.map((application, index) => (
        // key to be changed to id when backend is implemented
        <ApplicationCard key={index} application={application} />
      ))}
    </div>
  );
}

export default ApplicationList;

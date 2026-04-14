import { Application } from "@/utils/localStorage";
import EmptyState from "./EmptyState";
import ApplicationCard from "./ApplicationCard";

function ApplicationList({
  applications,
  onEdit,
  onDelete
}: {
  applications: Application[];
  onEdit: (application: Application, index: number) => void;
  onDelete: (index: number) => void
}) {
  if (applications.length === 0) {
    return <EmptyState />;
  }
  return (
    <div className="grid gap-4">
      {applications.map((application, index) => (
        // key to be changed to id when backend is implemented
        <ApplicationCard
          key={index}
          application={application}
          index={index}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default ApplicationList;

import { Application } from "@/utils/dataWrapper";
import EmptyState from "./EmptyState";
import ApplicationCard from "./ApplicationCard";

function ApplicationList({
  applications,
  onEdit,
  onDelete,
}: {
  applications: Application[];
  onEdit: (application: Application, id: string) => void;
  onDelete: (id: string) => void;
}) {
  if (applications.length === 0) {
    return <EmptyState />;
  }
  return (
    <div className="grid gap-4">
      {applications.map((application) => (
        // key to be changed to id when backend is implemented
        <ApplicationCard
          key={application.id}
          application={application}
          index={application.id}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default ApplicationList;

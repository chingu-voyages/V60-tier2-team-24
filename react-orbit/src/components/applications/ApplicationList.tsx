import { Application } from "@/utils/localStorage";
import EmptyState from "./EmptyState";
import ApplicationCard from "./ApplicationCard";

function ApplicationList({
  applications,
  onEdit,
  onDelete,
  onView,
}: {
  applications: Application[];
  onEdit: (application: Application, index: number) => void;
  onDelete: (index: number) => void;
  onView: (application: Application) => void;
}) {
  if (applications.length === 0) {
    return <EmptyState />;
  }
  return (
    <div className="grid gap-4">
      {applications.map((application, index) => (
        // key to be changed to id when backend is implemented
        <div
          key={index}
          className="cursor-pointer"
          onClick={() => onView(application)}
        >
          <ApplicationCard
            application={application}
            index={index}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
}

export default ApplicationList;

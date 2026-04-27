import { Application } from "@/utils/dataWrapper";
import EmptyState from "./EmptyState";
import ApplicationCard from "./ApplicationCard";

function ApplicationList({
  applications,
  totalApplicationsCount,
  onEdit,
  onDelete,
  onView,
}: {
  applications: Application[];
  totalApplicationsCount: number;
  onEdit: (application: Application) => void;
  onDelete: (id: string) => void;
  onView: (application: Application) => void;
}) {
  if (applications.length === 0) {
    if (totalApplicationsCount > 0) {
      return (
        <div className="text-center py-10">
          <h2 className="text-xl font-semibold">No matching applications</h2>
          <p className="text-gray-500 mt-2">
            Try selecting different statuses in the filter
          </p>
        </div>
      );
    }
    return <EmptyState />;
  }

  return (
    <div className="grid gap-4">
      {applications.map((application) => (
        <div
          key={application.id}
          className="cursor-pointer"
          onClick={() => onView(application)}
        >
          <ApplicationCard
            application={application}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
}

export default ApplicationList;

import { getTimeAgo } from "@/utils/date";
import { Application } from "@/lib/application";
import { getStatusStyles } from "@/utils/statusStyle";
import { cn } from "@/lib/utils";
import ApplicationActions from "./ApplicationActions";

function ApplicationCard({
  application,
  index,
  onEdit,
  onDelete
}: {
  application: Application;
  index: number;
  onEdit: (application: Application, index: number) => void;
  onDelete: (index: number) => void;
}) {
  const styles = getStatusStyles(application.Status);

  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow hover:shadow-md transition p-5 border-l-4",
        styles.border,
      )}
    >
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-bold">{application.CompanyName}</h3>
          <p className="flex flex-wrap items-center gap-2 text-xs text-gray-600 font-semibold">
            <span>{application.Role}</span>
            <>
              <span className="w-1 h-1 bg-gray-500 rounded-full inline-block mr-1 font-semibold"></span>
              <span>Applied {getTimeAgo(application.DateApplied)}</span>
            </>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={cn(
              "text-xs font-semibold px-4 py-1 rounded-full",
              styles.badge,
            )}
          >
            {application.Status.toUpperCase()}
          </span>
          <ApplicationActions
            index={index}
            application={application}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default ApplicationCard;

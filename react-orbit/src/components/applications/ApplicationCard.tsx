import { getTimeAgo } from "@/utils/date";
import { Application } from "@/utils/localStorage";
import { MoreVertical } from "lucide-react";
import { Button } from "../ui/button";

function ApplicationCard({ application }: { application: Application }) {
  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case "rejected":
        return {
          border: "border-red-700",
          badge: "bg-red-200 text-red-800",
        };
      case "interview":
        return {
          border: "border-blue-500",
          badge: "bg-blue-200 text-gray-500",
        };
      case "accepted":
      case "offer":
        return {
          border: "border-green-700",
          badge: "bg-green-700 text-gray-200",
        };
      case "applied":
      default:
        return {
          border: "border-gray-200",
          badge: "bg-gray-200 text-gray-500",
        };
    }
  };

  const styles = getStatusStyles(application.Status);

  return (
    <div
      className={`bg-white rounded-lg shadow p-4 border-l-4 ${styles.border}`}
    >
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold">{application.CompanyName}</h3>
          <p className="text-sm text-gray-600">
            <span>{application.Role} </span>
            <span className="w-1 h-1 bg-gray-500 rounded-full inline-block"></span>
            <span> Applied {getTimeAgo(application.DateApplied)}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-sm font-semibold ${styles.badge} text-gray-100 px-4 py-1 rounded-full`}
          >
            {application.Status.toUpperCase()}
          </span>
          <Button variant="ghost" size="icon" >
            <MoreVertical className="text-gray-400" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ApplicationCard;

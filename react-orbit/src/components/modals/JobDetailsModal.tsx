import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Application } from "@/utils/localStorage";
import { getStatusStyles } from "@/utils/statusStyle";
import { getTimeAgo } from "@/utils/date";
import { cn } from "@/lib/utils";
import {
  Calendar,
  MapPin,
  Link as LinkIcon,
  ExternalLink,
  CheckCircle2,
  Circle,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type JobDetailsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  application: Application | null;
};

const JobDetailsModal = ({
  open,
  onOpenChange,
  application,
}: JobDetailsModalProps) => {
  if (!application) return null;

  const styles = getStatusStyles(application.Status);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-[600px] max-h-[90vh] overflow-y-auto p-4 sm:p-6 gap-0 rounded-xl">
        <DialogHeader className="pb-4 sm:pb-6 border-b border-gray-200">
          <div className="flex flex-wrap items-center gap-2">
            <DialogTitle className="text-lg sm:text-xl font-bold">
              {application.CompanyName}
            </DialogTitle>
            <span
              className={cn(
                "text-[10px] font-bold tracking-wide px-2.5 py-0.5 rounded-full uppercase",
                styles.badge,
              )}
            >
              {application.Status}
            </span>
          </div>
          <DialogDescription className="text-sm text-muted-foreground capitalize font-bold text-left">
            {application.Role}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-4 sm:pb-6 pt-4 sm:pt-6">
          <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-3 sm:px-4 py-3">
            <Calendar className="h-5 w-5 text-blue-700 shrink-0" />
            <div className="min-w-0">
              <p className="text-[11px] text-muted-foreground leading-none mb-0.5">
                Date Applied
              </p>
              <p className="text-sm font-semibold truncate">
                Applied {getTimeAgo(application.DateApplied)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-3 sm:px-4 py-3">
            <MapPin className="h-5 w-5 text-blue-700 shrink-0" />
            <div className="min-w-0">
              <p className="text-[11px] text-muted-foreground leading-none mb-0.5">
                Location
              </p>
              <p className="text-sm font-semibold truncate">
                {application.Location}
              </p>
            </div>
          </div>
        </div>
        {application.JobLink && (
          <div className="pb-1 pt-1">
            <a
              href={application.JobLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-gray-100 rounded-lg px-3 sm:px-4 py-3 group"
            >
              <LinkIcon className="h-5 w-5 text-blue-700 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-[11px] text-muted-foreground leading-none mb-0.5">
                  Job Link
                </p>
                <p className="text-xs sm:text-sm font-semibold text-blue-700 truncate group-hover:underline">
                  {application.JobLink}
                </p>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0" />
            </a>
          </div>
        )}
        <div className="pb-4 sm:pb-6 pt-4 sm:pt-6">
          <h4 className="text-xs font-bold tracking-wide uppercase mb-3 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-foreground inline-block" />
            Milestones
          </h4>

          <div className="relative ml-1 pl-6 border-l-2 border-blue-200 space-y-4">
            <div className="relative">
              <CheckCircle2 className="absolute -left-[21px] top-0 h-5 w-5 text-blue-700 bg-white rounded-full" />
              <p className="text-sm font-semibold">Applied</p>
              <p className="text-xs text-muted-foreground">
                {new Date(application.DateApplied).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            {application.Status.toLowerCase() !== "applied" && (
              <div className="relative">
                <Circle className="absolute -left-[21px] top-0 h-5 w-5 text-blue-700 bg-white rounded-full" />
                <p className="text-sm font-semibold text-blue-700">
                  {application.Status.charAt(0).toUpperCase() +
                    application.Status.slice(1)}
                </p>
                <p className="text-xs text-muted-foreground">In progress</p>
              </div>
            )}
          </div>
        </div>
        {application.Notes && (
          <div className="pb-4 sm:pb-6 bg-gray-100 rounded-lg px-3 sm:px-4 py-3 pt-4 sm:pt-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold tracking-wide uppercase">
                Application Notes
              </h4>
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="bg-white rounded-lg shadow hover:shadow-md transition p-3 sm:p-5 border-l-4 border-blue-700 text-sm">
              {application.Notes}
            </div>
          </div>
        )}
        <DialogFooter className="pt-4 sm:pt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3">
          <Button
            variant="ghost"
            className="text-muted-foreground w-full sm:w-auto"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
          <Button className="bg-blue-700 hover:bg-blue-800 text-white rounded-full px-6 w-full sm:w-auto">
            Edit Application
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailsModal;

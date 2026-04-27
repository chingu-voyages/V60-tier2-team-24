import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Application } from "@/utils/dataWrapper";
import { getStatusStyles } from "@/utils/statusStyle";
import { getTimeAgo } from "@/utils/date";
import { cn } from "@/lib/utils";
import {
  Calendar,
  MapPin,
  Link2 as LinkIcon,
  ExternalLink,
  CheckCircle2,
  CircleDot,
  TextAlignJustify,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type JobDetailsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  application: Application | null;
  onEdit: (application: Application) => void;
};

const JobDetailsModal = ({
  open,
  onOpenChange,
  application,
  onEdit,
}: JobDetailsModalProps) => {
  if (!application) return null;

  const styles = getStatusStyles(application.Status);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-120 max-h-[85vh] overflow-y-auto p-5 gap-0 rounded-xl">
        <DialogHeader className="pb-3 border-b border-gray-100 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <DialogTitle className="text-base font-extrabold">
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
        <div className="grid grid-cols-2 gap-2 pb-2 pt-3\">
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-2.5 py-2.5">
            <div className="bg-white rounded-md p-1.5 flex items-center justify-center shrink-0">
              <Calendar className="h-4 w-4 text-blue-800" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-muted-foreground leading-tight mb-0.5">
                Date Applied
              </p>
              <p className="text-xs font-semibold truncate">
                Applied {getTimeAgo(application.DateApplied)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-2.5 py-2.5">
            <div className="bg-white rounded-md p-1.5 flex items-center justify-center shrink-0">
              <MapPin className="h-4 w-4 text-blue-800" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-muted-foreground leading-tight mb-0.5">
                Location
              </p>
              <p className="text-xs font-semibold truncate">
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
              className="flex items-center gap-2 bg-gray-100 rounded-lg px-2.5 py-2.5 group"
            >
              <div className="bg-white rounded-md p-1.5 flex items-center justify-center shrink-0">
                <LinkIcon className="h-4 w-4 text-blue-800" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-muted-foreground leading-tight mb-0.5">
                  Job Link
                </p>
                <p className="text-xs font-semibold text-blue-800 truncate group-hover:underline">
                  {application.JobLink}
                </p>
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            </a>
          </div>
        )}
        <div className="pb-6 sm:pb-6 pt-6 sm:pt-6">
          <h4 className="text-xs font-bold tracking-wide uppercase mb-3 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-foreground inline-block" />
            Milestones
          </h4>

          <div className="relative ml-0 pl-5 space-y-5 py-2 sm:py-2">
            <div className="relative">
              <CheckCircle2 className="absolute -left-5.25 top-0 h-5 w-5 text-blue-800 bg-white rounded-full" />
              <div className="pl-3">
                <p className="text-sm font-semibold">Applied</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(application.DateApplied).toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    },
                  )}
                </p>
              </div>
            </div>
            <div className="absolute left-2 top-8 bottom-10 w-0.5 bg-blue-200 -translate-x-1/2" />
            {application.Status.toLowerCase() !== "applied" && (
              <>
                <div className="relative pt-4">
                  <CircleDot className="absolute -left-5.25 top-4 h-5 w-5 text-blue-800 bg-white rounded-full" />
                  <div className="pl-3">
                    <p className="text-sm font-semibold text-blue-800">
                      {application.Status.charAt(0).toUpperCase() +
                        application.Status.slice(1)}
                    </p>
                    <p className="text-xs text-muted-foreground">In progress</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        {application.Notes && (
          <div className="pb-4 sm:pb-6 bg-gray-100 rounded-lg px-3 sm:px-4 py-3 pt-4 sm:pt-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold tracking-wide uppercase">
                Application Notes
              </h4>
              <TextAlignJustify className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="bg-white rounded-lg shadow hover:shadow-md transition p-3 sm:p-5 border-l-4 border-blue-700 text-sm">
              {application.Notes}
            </div>
          </div>
        )}
        <DialogFooter className="pt-4 sm:pt-6 flex flex-row justify-end gap-2 sm:gap-3">
          <Button
            variant="ghost"
            className="text-muted-foreground w-auto rounded-full"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
          <Button
            className="bg-blue-700 hover:bg-blue-800 text-white rounded-full px-6 w-auto"
            onClick={() => onEdit(application)}
          >
            Edit Application
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailsModal;

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Check, ListFilter } from "lucide-react";
import { APPLICATION_STATUSES, ApplicationStatus } from "@/constants/applicationStatus";

type ApplicationsStatusFilterProps = {
  selectedStatuses: ApplicationStatus[];
  onToggleStatus: (status: ApplicationStatus) => void;
};

const STATUS_OPTIONS = Object.values(APPLICATION_STATUSES) as ApplicationStatus[];

function ApplicationsStatusFilter({
  selectedStatuses,
  onToggleStatus,
}: ApplicationsStatusFilterProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-auto rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition-all hover:bg-white cursor-pointer"
        >
          <ListFilter className="h-4.5 w-4.5 text-slate-500" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="z-60 w-48 overflow-visible rounded-xl border border-slate-100 bg-white p-0 py-2 shadow-xl ring-1 ring-black/5"
      >
        <DropdownMenuLabel className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Status Filter
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="m-0 bg-slate-50" />
        {STATUS_OPTIONS.map((status) => (
          <DropdownMenuCheckboxItem
            key={status}
            checked={selectedStatuses.includes(status)}
            onSelect={(event) => event.preventDefault()}
            onCheckedChange={() => onToggleStatus(status)}
            className="[&>span:first-child]:hidden mx-2 my-0.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 focus:bg-slate-50 cursor-pointer"
          >
            <span
              className={`mr-3 flex h-5 w-5 items-center justify-center rounded-md border ${
                selectedStatuses.includes(status)
                  ? "border-[#0040a1] bg-[#0040a1] text-white"
                  : "border-slate-300 bg-white"
              }`}
            >
              {selectedStatuses.includes(status) ? (
                <Check className="h-3.5 w-3.5" />
              ) : null}
            </span>
            <span>{status}</span>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ApplicationsStatusFilter;

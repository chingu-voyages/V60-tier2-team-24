import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Briefcase,
  Building2,
  Calendar,
  CircleDot,
  Link,
  MapPin,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "./ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Application } from "@/utils/localStorage";
import { useState } from "react";
import { applicationSchema } from "@/lib/application";
import { toast } from "sonner";

type NewApplicationModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editApplication?: Application | null;
  index?: number | null;

  onSave: (application: Application) => void;
  onUpdate: (index: number, application: Application) => void;
};

const getInitialState = (application?: Application | null): Application => ({
  CompanyName: application?.CompanyName || "",
  Role: application?.Role || "",
  DateApplied: application?.DateApplied || "",
  Location: application?.Location || "",
  Status: application?.Status || "applied",
  JobLink: application?.JobLink || "",
  Notes: application?.Notes || "",
});

const NewApplicationModal = ({
  open,
  onOpenChange,
  editApplication,
  index,
  onSave,
  onUpdate,
}: NewApplicationModalProps) => {
  const [formState, setFormState] = useState<Application>(() =>
    getInitialState(editApplication),
  );

  // Per-field validation errors (keys match the Zod schema field names)
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateInput = <K extends keyof Application>(
    field: K,
    value: Application[K],
  ) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  // Save application into LocalStorage
  const saveApplication = () => {
    const validation = applicationSchema.safeParse(formState);
    if (!validation.success) {
      // Build a map of field name → first error message
      const fieldErrors: Record<string, string> = {};
      for (const issue of validation.error.issues) {
        const key = issue.path[0] as string;
        if (!fieldErrors[key]) {
          fieldErrors[key] = issue.message;
        }
      }
      setErrors(fieldErrors);
      toast.error("Please fix the highlighted fields");
      return;
    }

    // Clear any previous errors
    setErrors({});

    if (editApplication && index !== null) {
      onUpdate(index as number, validation.data);
      toast.success("Application updated!");
    } else {
      onSave(validation.data);
      toast.success("Application saved!");
    }
    // close modal after saving
    onOpenChange(false);
    setFormState(getInitialState(undefined));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {index !== null ? "Edit Application" : "Add New Application"}
          </DialogTitle>
          <DialogDescription>
            Fill in the details of your latest career opportunity
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label
              htmlFor="company-name"
              className="text-xs font-semibold uppercase tracking-wide"
            >
              Company Name <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building2 className=" h-4 w-4 text-[#94a3b8]" />
              </span>
              <Input
                id="company-name"
                type="text"
                className={`pl-10 ${errors.CompanyName ? "border-red-500" : ""}`}
                placeholder="e.g. Acme Corp"
                value={formState.CompanyName}
                onChange={(e) => updateInput("CompanyName", e.target.value)}
              />
            </div>
            {errors.CompanyName && (
              <p className="text-red-500 text-xs mt-1">{errors.CompanyName}</p>
            )}
          </div>
          <div>
            <Label
              htmlFor="job-title"
              className="text-xs font-semibold uppercase tracking-wide"
            >
              Job Role/Title <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Briefcase className=" h-4 w-4 text-[#94a3b8]" />
              </span>
              <Input
                id="job-title"
                type="text"
                className={`pl-10 ${errors.Role ? "border-red-500" : ""}`}
                placeholder="e.g. Software Engineer"
                value={formState.Role}
                onChange={(e) => updateInput("Role", e.target.value)}
              />
            </div>
            {errors.Role && (
              <p className="text-red-500 text-xs mt-1">{errors.Role}</p>
            )}
          </div>
          <div>
            <Label
              htmlFor="date-applied"
              className="text-xs font-semibold uppercase tracking-wide"
            >
              Date Applied <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className=" h-4 w-4 text-[#94a3b8]" />
              </span>
              <Input
                id="date-applied"
                type="date"
                className={`pl-10 ${errors.DateApplied ? "border-red-500" : ""}`}
                value={formState.DateApplied}
                onChange={(e) => updateInput("DateApplied", e.target.value)}
              />
            </div>
            {errors.DateApplied && (
              <p className="text-red-500 text-xs mt-1">{errors.DateApplied}</p>
            )}
          </div>
          <div>
            <Label
              htmlFor="location"
              className="text-xs font-semibold uppercase tracking-wide"
            >
              Location <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className=" h-4 w-4 text-[#94a3b8]" />
              </span>
              <Input
                id="location"
                type="text"
                className={`pl-10 ${errors.Location ? "border-red-500" : ""}`}
                placeholder="e.g. New York, NY"
                value={formState.Location}
                onChange={(e) => updateInput("Location", e.target.value)}
              />
            </div>
            {errors.Location && (
              <p className="text-red-500 text-xs mt-1">{errors.Location}</p>
            )}
          </div>
          <div>
            <Label
              htmlFor="status"
              className="text-xs font-semibold uppercase tracking-wide"
            >
              Current Status <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CircleDot className=" h-4 w-4 text-[#94a3b8]" />
              </span>
              <Select
                value={formState.Status}
                onValueChange={(value) => updateInput("Status", value)}
              >
                <SelectTrigger className="pl-10">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="applied">Applied</SelectItem>
                  <SelectItem value="interview">Interview</SelectItem>
                  <SelectItem value="offer">Offer</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {errors.Status && (
              <p className="text-red-500 text-xs mt-1">{errors.Status}</p>
            )}
          </div>
          <div>
            <Label
              htmlFor="link"
              className="text-xs font-semibold uppercase tracking-wide"
            >
              Job Link <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Link className=" h-4 w-4 text-[#94a3b8]" />
              </span>
              <Input
                id="link"
                type="text"
                className={`pl-10 ${errors.JobLink ? "border-red-500" : ""}`}
                placeholder="e.g. https://example.com/job..."
                value={formState.JobLink}
                onChange={(e) => updateInput("JobLink", e.target.value)}
              />
            </div>
            {errors.JobLink && (
              <p className="text-red-500 text-xs mt-1">{errors.JobLink}</p>
            )}
          </div>
          <div className="col-span-2">
            <Label
              htmlFor="notes"
              className="text-xs font-semibold uppercase tracking-wide"
            >
              Notes <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Textarea
                id="notes"
                value={formState.Notes}
                onChange={(e) => updateInput("Notes", e.target.value)}
                className={errors.Notes ? "border-red-500" : ""}
                placeholder="Mention key requirements, interview stages, or personal thoughts..."
              />
            </div>
            {errors.Notes && (
              <p className="text-red-500 text-xs mt-1">{errors.Notes}</p>
            )}
          </div>
        </div>
        <div className="flex gap-3 p-4 justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="bg-[#0040a1] hover:bg-[#003080]"
            onClick={saveApplication}
          >
            {index !== null ? "Update Application" : "Save Application"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewApplicationModal;

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
import { LocalStorage } from "@/utils/localStorage";
import { useRef, useState } from "react";
import { applicationSchema } from "@/lib/application";
import { toast } from "sonner";

type NewApplicationModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const NewApplicationModal = ({
  open,
  onOpenChange,
}: NewApplicationModalProps) => {
  // Refs for form inputs
  const companyName = useRef<HTMLInputElement>(null);
  const role = useRef<HTMLInputElement>(null);
  const dateApplied = useRef<HTMLInputElement>(null);
  const location = useRef<HTMLInputElement>(null);
  const jobLink = useRef<HTMLInputElement>(null);
  const notes = useRef<HTMLTextAreaElement>(null);

  // Radix Select doesn't expose its value via a DOM ref — use state
  const [status, setStatus] = useState("");

  // Per-field validation errors (keys match the Zod schema field names)
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Save application into LocalStorage
  const saveApplication = () => {
    const newApplication = {
      CompanyName: companyName.current?.value || "",
      Role: role.current?.value || "",
      DateApplied: dateApplied.current?.value || "",
      Location: location.current?.value || "",
      Status: status,
      JobLink: jobLink.current?.value || "",
      Notes: notes.current?.value || "",
    };

    const validation = applicationSchema.safeParse(newApplication);
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

    // Get existing applications, add the new one, and save back to localStorage
    const existing = LocalStorage.get("applications") ?? [];
    LocalStorage.set("applications", [...existing, validation.data]);

    toast.success("Application saved!");
    // close modal after saving
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Application</DialogTitle>
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
                ref={companyName}
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
                ref={role}
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
                ref={dateApplied}
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
                ref={location}
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
              <Select value={status} onValueChange={setStatus}>
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
                ref={jobLink}
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
                ref={notes}
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
            Save Application
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewApplicationModal;

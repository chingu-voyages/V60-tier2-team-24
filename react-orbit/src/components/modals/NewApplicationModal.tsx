import { useState } from "react";
import {
  Briefcase,
  Building2,
  Calendar,
  CircleDot,
  FileUp,
  Link,
  MapPin,
} from "lucide-react";
import { toast } from "sonner";

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
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { Application } from "@/utils/dataWrapper";
import { ApplicationInput, applicationSchema } from "@/lib/application";
import { APPLICATION_STATUSES } from "@/constants/applicationStatus";
import uploadImage from "@/utils/upload";

type NewApplicationModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editApplication?: Application | null;
  id?: string | null;

  onSave: (application: ApplicationInput) => Promise<void>;
  onUpdate: (id: string, application: ApplicationInput) => Promise<void>;
};

const getInitialState = (
  application?: Application | null,
): ApplicationInput => ({
  CompanyName: application?.CompanyName || "",
  Role: application?.Role || "",
  DateApplied: application?.DateApplied || "",
  Location: application?.Location || "",
  Status: application?.Status || "applied",
  JobLink: application?.JobLink || "",
  Notes: application?.Notes || "",
});

const inputStyles = (hasError: boolean) =>
  `bg-[#f2f4f6] rounded-lg border-0 placeholder:text-[#94a3b8] ${
    hasError ? "border-2 border-red-500" : ""
  }`;

const getFileName = (url?: string) => {
  if (!url) return "";
  const name = url.split("/").pop() || "";
  return name.length > 30 ? name.slice(0, 30) + "..." : name;
};

const NewApplicationModal = ({
  open,
  onOpenChange,
  editApplication,
  id,
  onSave,
  onUpdate,
}: NewApplicationModalProps) => {
  const [formState, setFormState] = useState<ApplicationInput>(() =>
    getInitialState(editApplication),
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);

  const updateInput = <K extends keyof ApplicationInput>(
    field: K,
    value: ApplicationInput[K],
  ) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleResumeUpload = (file: File | null) => {
    if (!file) return;

    // Validate type
    if (file.type !== "application/pdf") {
      setResumeError("Only PDF files are allowed");
      setResumeFile(null);
      return;
    }

    // Validate size (5MB max)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setResumeError("File size must be less than 5MB");
      setResumeFile(null);
      return;
    }

    setResumeError(null);
    setResumeFile(file);
  };

  const saveApplication = async () => {
    const validation = applicationSchema.safeParse(formState);

    if (!validation.success) {
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

    setErrors({});
    setLoading(true);

    try {
      let resumeData = {
        url: editApplication?.ResumeUrl ?? "",
        public_id: editApplication?.ResumePublicId ?? "",
      };

      if (resumeFile) {
        const { data } = await uploadImage(resumeFile);

        resumeData = {
          url: data.secure_url,
          public_id: data.public_id,
        };
      }
      if (editApplication && id) {
        await onUpdate(id, {
          ...validation.data,
          ResumeUrl: resumeData?.url ?? editApplication?.ResumeUrl,
          ResumePublicId:
            resumeData?.public_id ?? editApplication?.ResumePublicId,
        });
        toast.success("Application updated!");
      } else {
        await onSave({
          ...validation.data,
          ResumeUrl: resumeData?.url,
          ResumePublicId: resumeData?.public_id,
        });
        toast.success("Application saved!");
      }

      onOpenChange(false);
      setFormState(getInitialState(undefined));
      setResumeFile(null);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setErrors({});
      setFormState(getInitialState(undefined));
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl h-[90vh] flex flex-col sm:rounded-2xl">
        <DialogHeader className="shrink-0 border-b pb-3">
          <DialogTitle>
            {id ? "Edit Application" : "Add New Application"}
          </DialogTitle>
          <DialogDescription className="text-sm text-[#64748b]">
            Fill in the details of your latest career opportunity
          </DialogDescription>
        </DialogHeader>

        {/* BODY (SCROLLABLE) */}
        <div className="flex-1 overflow-y-auto px-1 py-2">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label
                htmlFor="company-name"
                className="text-xs m-2 font-manrope uppercase tracking-wide"
              >
                Company Name <span className="text-red-500">*</span>
              </Label>
              <div className="relative pt-1">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building2 className=" h-4 w-4 text-[#94a3b8]" />
                </span>
                <Input
                  id="company-name"
                  type="text"
                  className={`pl-10 ${inputStyles(!!errors.CompanyName)}`}
                  placeholder="e.g. Acme Corp"
                  value={formState.CompanyName}
                  onChange={(e) => updateInput("CompanyName", e.target.value)}
                />
              </div>
              {errors.CompanyName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.CompanyName}
                </p>
              )}
            </div>
            <div>
              <Label
                htmlFor="job-title"
                className="text-xs m-2 font-manrope uppercase tracking-wide"
              >
                Job Role/Title <span className="text-red-500">*</span>
              </Label>
              <div className="relative pt-1">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase className=" h-4 w-4 text-[#94a3b8]" />
                </span>
                <Input
                  id="job-title"
                  type="text"
                  className={`pl-10 ${inputStyles(!!errors.Role)}`}
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
                className="text-xs m-2 font-manrope uppercase tracking-wide"
              >
                Date Applied <span className="text-red-500">*</span>
              </Label>
              <div className="relative pt-1">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className=" h-4 w-4 text-[#94a3b8]" />
                </span>
                <Input
                  id="date-applied"
                  type="date"
                   max={new Date().toISOString().split("T")[0]}
                  value={formState.DateApplied}
                  onChange={(e) => updateInput("DateApplied", e.target.value)}
                  className={`pl-10 ${inputStyles(!!errors.DateApplied)}`}
                />
              </div>
              {errors.DateApplied && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.DateApplied}
                </p>
              )}
            </div>
            <div>
              <Label
                htmlFor="location"
                className="text-xs m-2 font-manrope uppercase tracking-wide"
              >
                Location <span className="text-red-500">*</span>
              </Label>
              <div className="relative pt-1">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className=" h-4 w-4 text-[#94a3b8]" />
                </span>
                <Input
                  id="location"
                  type="text"
                  className={`pl-10 ${inputStyles(!!errors.Location)}`}
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
                className="text-xs m-2 font-manrope uppercase tracking-wide"
              >
                Current Status <span className="text-red-500">*</span>
              </Label>
              <div className="relative pt-1">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CircleDot className=" h-4 w-4 text-[#94a3b8]" />
                </span>
                <Select
                  value={formState.Status}
                  onValueChange={(value) => updateInput("Status", value)}
                >
                  <SelectTrigger
                    className={`pl-10 ${inputStyles(!!errors.Status)}`}
                  >
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={APPLICATION_STATUSES.APPLIED}>
                      Applied
                    </SelectItem>
                    <SelectItem value={APPLICATION_STATUSES.INTERVIEW}>
                      Interview
                    </SelectItem>
                    <SelectItem value={APPLICATION_STATUSES.OFFER}>
                      Offer
                    </SelectItem>
                    <SelectItem value={APPLICATION_STATUSES.REJECTED}>
                      Rejected
                    </SelectItem>
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
                className="text-xs m-2 font-manrope uppercase tracking-wide"
              >
                Job Link <span className="text-red-500">*</span>
              </Label>
              <div className="relative pt-1">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Link className=" h-4 w-4 text-[#94a3b8]" />
                </span>
                <Input
                  id="link"
                  type="text"
                  className={`pl-10 ${inputStyles(!!errors.JobLink)}`}
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
                htmlFor="resume"
                className="text-xs m-2 font-manrope tracking-wide"
              >
                <span className="uppercase">Resume </span>{" "}
                <span>(optional - pdf only, max 5mb)</span>
              </Label>

              <input
                id="resume"
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) =>
                  handleResumeUpload(e.target.files?.[0] || null)
                }
              />

              <label
                htmlFor="resume"
                className="flex items-center gap-3 border-2 border-dashed border-gray-300 rounded-xl px-4 py-2 cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
              >
                <FileUp className="h-5 w-5 text-gray-400" />
                <span
                  className={`text-sm truncate ${
                    resumeFile || editApplication?.ResumeUrl
                      ? "text-blue-700"
                      : "text-gray-600"
                  }`}
                >
                  {resumeFile
                    ? resumeFile.name
                    : editApplication?.ResumeUrl
                      ? `Current: ${getFileName(editApplication.ResumeUrl)}`
                      : "Upload Resume (PDF only)"}
                </span>
              </label>

              {resumeFile && (
                <p className="text-xs mt-1 text-gray-500">
                  Click to replace file
                </p>
              )}

              {editApplication?.ResumeUrl && !resumeFile && (
                <p className="text-xs mt-1 text-blue-600">
                  Resume already uploaded. Click to replace resume
                </p>
              )}

              {resumeError && (
                <p className="text-red-500 text-xs mt-1">{resumeError}</p>
              )}
            </div>
            <div className="col-span-2">
              <Label
                htmlFor="notes"
                className="text-xs m-2 font-manrope uppercase tracking-wide"
              >
                Notes
              </Label>
              <div className="relative pt-1">
                <Textarea
                  id="notes"
                  value={formState.Notes}
                  onChange={(e) => updateInput("Notes", e.target.value)}
                  className={`min-h-30 ${inputStyles(!!errors.Notes)}`}
                  placeholder="Mention key requirements, interview stages, or personal thoughts..."
                />
              </div>
              {errors.Notes && (
                <p className="text-red-500 text-xs mt-1">{errors.Notes}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-3 p-4 justify-end border-t shrink-0">
          <Button variant="ghost" className="cursor-pointer" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button
            disabled={loading}
            className="bg-[#0040a1] hover:bg-[#003080] px-8 rounded-lg cursor-pointer"
            onClick={saveApplication}
          >
            {loading
              ? "Saving..."
              : id
                ? "Update Application"
                : "Save Application"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewApplicationModal;

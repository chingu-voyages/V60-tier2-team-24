import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Briefcase, Building2, Calendar, CircleDot, Link, MapPin } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from "./ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type NewApplicationModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const NewApplicationModal = ({ open, onOpenChange }: NewApplicationModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Application</DialogTitle>
          <DialogDescription>Fill in the details of your latest career opportunity</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div>
          <Label htmlFor="company-name" className="text-xs font-semibold uppercase tracking-wide">Company Name <span className="text-red-500">*</span></Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Building2 className=" h-4 w-4 text-[#94a3b8]"/>
            </span>
            <Input
              id="company-name"
              type="text"
              className="pl-10"
              placeholder="e.g. Acme Corp"
            />
            </div>
          </div>
          <div>
          <Label htmlFor="job-title" className="text-xs font-semibold uppercase tracking-wide">Job Role/Title <span className="text-red-500">*</span></Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Briefcase className=" h-4 w-4 text-[#94a3b8]"/>
            </span>
            <Input
              id="job-title"
              type="text"
              className="pl-10"
              placeholder="e.g. Software Engineer"
            />
            </div>
          </div>
          <div>
          <Label htmlFor="date-applied" className="text-xs font-semibold uppercase tracking-wide">Date Applied <span className="text-red-500">*</span></Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar className=" h-4 w-4 text-[#94a3b8]"/>
            </span>
            <Input
              id="date-applied"
              type="date"
              className="pl-10"
            />
            </div>
          </div>
          <div>
          <Label htmlFor="location" className="text-xs font-semibold uppercase tracking-wide">Location <span className="text-red-500">*</span></Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className=" h-4 w-4 text-[#94a3b8]" />
            </span>
            <Input
              id="location"
              type="text"
              className="pl-10"
              placeholder="e.g. New York, NY"
            />
            </div>
          </div>
          <div>
          <Label htmlFor="status" className="text-xs font-semibold uppercase tracking-wide">Current Status <span className="text-red-500">*</span></Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CircleDot className=" h-4 w-4 text-[#94a3b8]" />
            </span>
              <Select >
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
          </div>
          <div>
          <Label htmlFor="link" className="text-xs font-semibold uppercase tracking-wide">Job Link <span className="text-red-500">*</span></Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Link className=" h-4 w-4 text-[#94a3b8]" />
            </span>
            <Input
              id="link"
              type="text"
                className="pl-10"
              placeholder="e.g. https://example.com/job..."
            />
            </div>
          </div>
          <div className="col-span-2">
          <Label htmlFor="notes" className="text-xs font-semibold uppercase tracking-wide">Notes <span className="text-red-500">*</span></Label>
          <div className="relative">
            <Textarea
              id="notes"
              placeholder="Mention key requirements, interview stages, or personal thoughts..."
            />
            </div>
          </div>
        </div>
        <div className="flex gap-3 p-4 justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="bg-[#0040a1] hover:bg-[#003080]">
              Save Application
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default NewApplicationModal
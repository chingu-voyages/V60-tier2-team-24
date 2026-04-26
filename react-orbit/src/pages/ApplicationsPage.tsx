import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import ApplicationList from "@/components/applications/ApplicationList";
import NewApplicationModal from "@/components/modals/NewApplicationModal";
import JobDetailsModal from "@/components/modals/JobDetailsModal";
import DeleteConfirmationModal from "@/components/modals/ConfirmDeleteModal";
import ApplicationsStatusFilter from "@/components/applications/ApplicationsStatusFilter";

import { useApplications } from "@/hooks/useApplications";
import { useApplicationStatusFilter } from "@/hooks/useApplicationStatusFilter";
import { Application } from "@/utils/localStorage";

export function ApplicationsPage() {
  const [open, setOpen] = useState(false);
  const [removeOpen, setRemoveOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  const { applications, addApplication, updateApplication, removeApplication } =
    useApplications();
  const { selectedStatuses, filteredApplications, toggleStatus } =
    useApplicationStatusFilter(applications);
  const [editApplication, setEditApplication] = useState<Application | null>(
    null,
  );

  // NOTE: index for update application - need to switch to proper id when backend implementation to avoid wrong renders
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const handleCreate = () => {
    setEditApplication(null);
    setEditIndex(null);
    setOpen(true);
  };

  const handleEdit = (app: Application, index: number) => {
    setEditApplication(app);
    setEditIndex(index);
    setOpen(true);
  };

  const handleView = (app: Application) => {
    setSelectedApplication(app);
    setDetailsOpen(true);
  };

  const handleDelete = (index: number) => {
    setDeleteIndex(index);
    setRemoveOpen(true);
  };

  const handleRemoveConfirm = () => {
    if (deleteIndex !== null) removeApplication(deleteIndex);
    setDeleteIndex(null);
    setRemoveOpen(false);
    toast.success("Application removed!");
  };

  const handleRemoveOpenChange = (open: boolean) => {
    setRemoveOpen(open);
    if (!open) setDeleteIndex(null);
  };

  return (
    <section className="space-y-6">
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Applications
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
            Manage your career journey and track prospects
          </p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <Button
            onClick={handleCreate}
            className="bg-[#0040a1] hover:bg-[#003080] text-white"
          >
            + Add Application
          </Button>
          <ApplicationsStatusFilter
            selectedStatuses={selectedStatuses}
            onToggleStatus={toggleStatus}
          />
        </div>

        <NewApplicationModal
          key={editIndex !== null ? `edit-${editIndex}` : "new"} // temporary key until proper id
          open={open}
          onOpenChange={(val) => {
            setOpen(val);
            if (!val) {
              setEditApplication(null);
              setEditIndex(null);
            }
          }}
          editApplication={editApplication}
          index={editIndex}
          onSave={addApplication}
          onUpdate={updateApplication}
        />
      </div>

      <ApplicationList
        applications={filteredApplications}
        totalApplicationsCount={applications.length}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />

      <JobDetailsModal
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        application={selectedApplication}
      />

      <DeleteConfirmationModal
        open={removeOpen}
        onOpenChange={handleRemoveOpenChange}
        onConfirm={handleRemoveConfirm}
      />
    </section>
  );
}

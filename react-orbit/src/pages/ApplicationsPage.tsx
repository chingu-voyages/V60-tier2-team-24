import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import ApplicationList from "@/components/applications/ApplicationList";
import NewApplicationModal from "@/components/modals/NewApplicationModal";
import JobDetailsModal from "@/components/modals/JobDetailsModal";
import DeleteConfirmationModal from "@/components/modals/ConfirmDeleteModal";
import ApplicationsStatusFilter from "@/components/applications/ApplicationsStatusFilter";

import { useApplications } from "@/hooks/useApplications";
import { Application } from "@/utils/dataWrapper";
import { useApplicationStatusFilter } from "@/hooks/useApplicationStatusFilter";

export function ApplicationsPage() {
  const [open, setOpen] = useState(false);
  const [removeOpen, setRemoveOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedApplicationId, setSelectedApplicationId] = useState<
    string | null
  >(null);

  const {
    applications,
    addApplication,
    updateApplication,
    removeApplication,
    loading,
    error,
  } = useApplications();
  const { selectedStatuses, filteredApplications, toggleStatus } =
    useApplicationStatusFilter(applications);
  const [editApplication, setEditApplication] = useState<Application | null>(
    null,
  );

  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleCreate = () => {
    setEditApplication(null);
    setEditId(null);
    setOpen(true);
  };

  const handleEdit = (app: Application) => {
    setEditApplication(app);
    setEditId(app.id);
    setOpen(true);
  };

  const handleView = (app: Application) => {
    setSelectedApplicationId(app.id);
    setDetailsOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setRemoveOpen(true);
  };

  const handleRemoveConfirm = async () => {
    if (!deleteId) return;
    setDeleteLoading(true);
    try {
      await removeApplication(deleteId);
      toast.success("Application removed!");
      setRemoveOpen(false);
    } catch (error) {
      toast.error("Failed to remove application.");
    } finally {
      setDeleteLoading(false);
      setDeleteId(null);
    }
  };

  const handleRemoveOpenChange = (open: boolean) => {
    setRemoveOpen(open);
    if (!open) setDeleteId(null);
  };

  const selectedApplication =
    applications.find((app) => app.id === selectedApplicationId) || null;

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
          key={editId !== null ? `edit-${editId}` : "new"}
          open={open}
          onOpenChange={(val) => {
            setOpen(val);
            if (!val) {
              setEditApplication(null);
              setEditId(null);
            }
          }}
          editApplication={editApplication}
          id={editId}
          onSave={addApplication}
          onUpdate={updateApplication}
        />
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">
          Loading applications...
        </div>
      ) : error ? (
        <div className="text-center py-10">
          <p className="text-red-500 font-semibold">
            Failed to load applications
          </p>
        </div>
      ) : (
        <ApplicationList
          applications={filteredApplications}
          totalApplicationsCount={applications.length}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        />
      )}

      <JobDetailsModal
        open={detailsOpen}
        onEdit={handleEdit}
        onOpenChange={setDetailsOpen}
        application={selectedApplication}
      />

      <DeleteConfirmationModal
        open={removeOpen}
        onOpenChange={handleRemoveOpenChange}
        onConfirm={handleRemoveConfirm}
        loading={deleteLoading}
      />
    </section>
  );
}

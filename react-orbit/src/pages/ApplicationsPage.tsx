import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import ApplicationList from "@/components/applications/ApplicationList";
import NewApplicationModal from "@/components/NewApplicationModal";
import DeleteConfirmationModal from "@/components/applications/ConfirmDeleteModal";

import { useApplications } from "@/hooks/useApplications";
import { Application } from "@/utils/localStorage";

export function ApplicationsPage() {
  const [open, setOpen] = useState(false);
  const [removeOpen, setRemoveOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const { applications, addApplication, updateApplication, removeApplication } =
    useApplications();
  const [editApplication, setEditApplication] = useState<Application | null>(
    null,
  );

  // NOTE: index for update application - need to switch to proper id when backend implementation to avoid wrong renders
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

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Applications
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
          Manage your career journey and track prospects
        </p>
        <Button
          onClick={handleCreate}
          className="bg-[#0040a1] hover:bg-[#003080] text-white"
        >
          + Add Application
        </Button>
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
          index={editId}
          onSave={addApplication}
          onUpdate={updateApplication}
        />
      </div>

      <ApplicationList
        applications={applications}
        onEdit={handleEdit}
        onDelete={handleDelete}
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

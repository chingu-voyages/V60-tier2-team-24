import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import ApplicationList from "@/components/applications/ApplicationList";
import NewApplicationModal from "@/components/NewApplicationModal";
import DeleteConfirmationModal from "@/components/applications/ConfirmDeleteModal";

import { Application } from "@/utils/localStorage";
import { useApplications } from "@/hooks/useApplications";

export function DashboardPage() {
  const [open, setOpen] = useState(false);
  const [removeOpen, setRemoveOpen] = useState(false);

  const [editApplication, setEditApplication] = useState<Application | null>(
    null,
  );
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const { applications, addApplication, updateApplication, removeApplication } =
    useApplications();

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
    <>
      <h1 className="text-2xl font-bold mb-4">Welcome to Orbit!</h1>
      <p className="mt-2 text-[#424654]">
        Manage your Career journey and tract prospects.
      </p>

      <Button
        onClick={handleCreate}
        className="bg-[#0040a1] hover:bg-[#003080] text-white"
      >
        + Add Application
      </Button>
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

      <h2 className="text-2xl font-bold mt-8 mb-4">Applications</h2>
      <ApplicationList
        applications={applications}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <DeleteConfirmationModal
        open={removeOpen}
        onOpenChange={handleRemoveOpenChange}
        onConfirm={handleRemoveConfirm}
      />
    </>
  );
}

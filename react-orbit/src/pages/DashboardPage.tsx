import ApplicationList from "@/components/applications/ApplicationList";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import NewApplicationModal from "@/components/NewApplicationModal";
import { Application } from "@/utils/localStorage";
import { useApplications } from "@/hooks/useApplications";

export function DashboardPage() {
  const [open, setOpen] = useState(false);
  const [editApplication, setEditApplication] = useState<Application | null>(
    null,
  );
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const { applications, addApplication, updateApplication } = useApplications();

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
      <ApplicationList applications={applications} onEdit={handleEdit} />
    </>
  );
}

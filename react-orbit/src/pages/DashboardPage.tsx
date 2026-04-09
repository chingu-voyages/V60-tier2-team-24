import ApplicationList from "@/components/applications/ApplicationList";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import NewApplicationModal from "@/components/NewApplicationModal";
import { Application } from "@/utils/localStorage";
import { useApplications } from "@/hooks/useApplications";

export function DashboardPage() {
  const [open, setOpen] = useState(false);
  const [editApplication, setEditApplication] = useState<
    Application | undefined
  >();
  const [editIndex, setEditIndex] = useState<number | undefined>(undefined);

  const { applications, addApplication, updateApplication } = useApplications();

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Welcome to Orbit!</h1>
      <p className="mt-2 text-[#424654]">
        Manage your Career journey and tract prospects.
      </p>

      <Button
        onClick={() => {
          setEditApplication(undefined);
          setEditIndex(undefined);
          setOpen(true);
        }}
        className="bg-[#0040a1] hover:bg-[#003080] text-white"
      >
        + Add Application
      </Button>
      <NewApplicationModal
        open={open}
        onOpenChange={(val) => {
          setOpen(val);

          if (!val) {
            setEditApplication(undefined);
            setEditIndex(undefined);
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
        onEdit={(app, index) => {
          setEditApplication(app);
          setEditIndex(index);
          setOpen(true);
        }}
      />
    </>
  );
}

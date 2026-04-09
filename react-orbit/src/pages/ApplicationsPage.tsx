import ApplicationList from "@/components/applications/ApplicationList";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import NewApplicationModal from "@/components/NewApplicationModal";
import { useApplications } from "@/hooks/useApplications";
import { Application } from "@/utils/localStorage";

export function ApplicationsPage() {
  const [open, setOpen] = useState(false);
  const { applications, addApplication, updateApplication } = useApplications();
  const [editApplication, setEditApplication] = useState<
    Application | undefined
  >(undefined);

  // NOTE: index for update application - need to switch to proper id when backend implementation to avoid wrong renders
  const [editIndex, setEditIndex] = useState<number | undefined>(undefined);

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
      </div>

      <ApplicationList
        applications={applications}
        onEdit={(app, index) => {
          setEditApplication(app);
          setEditIndex(index);
          setOpen(true);
        }}
      />
    </section>
  );
}

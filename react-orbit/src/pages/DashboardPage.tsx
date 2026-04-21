import { toast } from "sonner";
import { useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import StatsCard from "@/components/StatsCard";
import NewApplicationModal from "@/components/modals/NewApplicationModal";
import JobDetailsModal from "@/components/modals/JobDetailsModal";
import { useApplications } from "@/hooks/useApplications";
import { Application } from "@/utils/localStorage";
import calculateMetrics from "@/utils/dashboardMetrics";
import ApplicationCard from "@/components/applications/ApplicationCard";
import EmptyState from "@/components/applications/EmptyState";
import DeleteConfirmationModal from "@/components/modals/ConfirmDeleteModal";

export function DashboardPage() {
  const [open, setOpen] = useState(false);
  const [removeOpen, setRemoveOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);
  const [editApplication, setEditApplication] = useState<Application | null>(
    null,
  );
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const { applications, addApplication, updateApplication, removeApplication } =
    useApplications();
  const { totalApplications, interviewRate, offerRate, rejectionRate } =
    calculateMetrics(applications);
  const recentApplications = applications.slice(-4).reverse(); // Get the 4 most recent applications

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
    <div>
      <h1 className="text-4xl font-extrabold font-manrope mb-4">
        Welcome back, Alex.
      </h1>

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-6 my-8">
        <StatsCard
          label="Total Applications"
          value={totalApplications}
          borderColor="#0040a1"
        />
        <StatsCard
          label="Interview rate"
          value={interviewRate}
          borderColor="#515f74"
        />
        <StatsCard label="Offer rate" value={offerRate} borderColor="#005136" />
        <StatsCard
          label="Rejection rate"
          value={rejectionRate}
          borderColor="#ba1a1a"
        />
      </div>
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold mb-4">Recent Activity</h2>
        <Link
          to="/applications"
          className="text-md text-[#1e40af] hover:underline mb-4"
        >
          View All Applications
        </Link>
      </div>
      <div className="grid gap-4">
        {recentApplications.length > 0 ? (
          recentApplications.map((app, index) => (
            <div
              key={app.CompanyName}
              className="cursor-pointer"
              onClick={() => handleView(app)}
            >
              <ApplicationCard
                application={app}
                index={index}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          ))
        ) : (
          <EmptyState />
        )}
      </div>
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
    </div>
  );
}
export default DashboardPage;

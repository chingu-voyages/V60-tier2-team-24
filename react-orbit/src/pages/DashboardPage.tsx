import { toast } from "sonner";
import { useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import StatsCard from "@/components/StatsCard";
import NewApplicationModal from "@/components/modals/NewApplicationModal";
import JobDetailsModal from "@/components/modals/JobDetailsModal";
import { useApplications } from "@/hooks/useApplications";
import { Application } from "@/utils/dataWrapper";
import calculateMetrics from "@/utils/dashboardMetrics";
import ApplicationCard from "@/components/applications/ApplicationCard";
import EmptyState from "@/components/applications/EmptyState";
import DeleteConfirmationModal from "@/components/modals/ConfirmDeleteModal";
import { auth } from "@/lib/firebase";
import { filterApplications } from "@/utils/filterApplications";
import { useSearch } from "@/context/SearchContext";


export function DashboardPage() {
  const [open, setOpen] = useState(false);
  const [removeOpen, setRemoveOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);
  const [editApplication, setEditApplication] = useState<Application | null>(
    null,
  );
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const {
    applications,
    addApplication,
    updateApplication,
    removeApplication,
    loading,
    error,
  } = useApplications();
  const { searchTerm } = useSearch();
  const filteredApplications = filterApplications (applications, searchTerm); // No filter on dashboard, show all
  const { totalApplications, interviewRate, offerRate, rejectionRate } =
    calculateMetrics(filteredApplications);
  const recentApplications = filteredApplications.slice(-4).reverse(); // Get the 4 most recent applications

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
    setSelectedApplication(app);
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

  return (
    <div>
      <h1 className="text-4xl font-extrabold font-manrope mb-4">
        Welcome back, {auth.currentUser?.displayName || "User"}.
      </h1>

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
        id={editId}
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
        {loading ? (
          <p className="text-center text-gray-500 col-span-full">
            Loading applications...
          </p>
        ) : error ? (
          <div className="text-center col-span-full">
            <p className="text-red-500 font-semibold">
              Failed to load applications
            </p>
          </div>
        ) : recentApplications.length > 0 ? (
          recentApplications.map((app) => (
            <div
              key={app.id}
              className="cursor-pointer"
              onClick={() => handleView(app)}
            >
              <ApplicationCard
                application={app}
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
    </div>
  );
}
export default DashboardPage;

import { Application, LocalStorage } from "@/utils/localStorage";
import EmptyState from "./EmptyState";
import ApplicationCard from "./ApplicationCard";
import { useState } from "react";
import JobDetailsModal from "@/components/modals/JobDetailsModal";

function ApplicationList() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  const handleCardClick = (application: Application) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  // Switch to state when form is integrated
  const applications = LocalStorage.get("applications") || [];

  if (applications.length === 0) {
    return <EmptyState />;
  }
  return (
    <div className="grid gap-4">
      {applications.map((application, index) => (
        // key to be changed to id when backend is implemented
        <div
          key={index}
          className="cursor-pointer"
          onClick={() => handleCardClick(application)}
        >
          <ApplicationCard application={application} />
        </div>
      ))}
      <JobDetailsModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        application={selectedApplication}
      />
    </div>
  );
}

export default ApplicationList;

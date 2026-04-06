
import { Footer } from "./components/Footer";
import ApplicationList from "@/components/applications/ApplicationList";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import NewApplicationModal from "./components/NewApplicationModal";


function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f9fb]">
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Welcome to Orbit!</h1>
        <p className="mt-2 text-[#424654]">
          Manage your Career journey and tract prospects.
        </p>

      <Button
        onClick={() => setOpen(true)}
        className="bg-[#0040a1] hover:bg-[#003080] text-white">
        + Add Application
      </Button>
      <NewApplicationModal open={open} onOpenChange={setOpen} />

        <h2 className="text-2xl font-bold mt-8 mb-4">Applications</h2>
        <ApplicationList />
      </main>

      {/* Footer */}
      <Footer />

      
    </div>
  );
}

export default App


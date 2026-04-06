import { useState } from "react";
import { Button } from "@/components/ui/button";
import NewApplicationModal from "./components/NewApplicationModal";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f9fb] p-8">
      <h1 className="text-2xl font-bold mb-4">Orbit</h1>

      <Button
        onClick={() => setOpen(true)}
        className="bg-[#0040a1] hover:bg-[#003080] text-white"
      >
        + Add Application
      </Button>
      <NewApplicationModal open={open} onOpenChange={setOpen} />
    </div>
  );
}

export default App;

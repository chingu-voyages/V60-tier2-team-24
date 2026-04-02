import { Button } from "@/components/ui/button";
import ApplicationList from "@/components/applications/ApplicationList";

function App() {
  return (
    <div className="min-h-screen bg-[#f7f9fb] p-8">
      <h1 className="text-2xl font-bold mb-4">
        Orbit is running on Vite + Tailwind + shadcn!
      </h1>
      <div className="flex gap-3">
        <Button>Default Button</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="destructive">Destructive</Button>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Applications</h2>
      <ApplicationList />
    </div>
  );
}

export default App;

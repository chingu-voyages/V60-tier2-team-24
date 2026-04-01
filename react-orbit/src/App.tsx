import { Button } from "@/components/ui/button";

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
    </div>
  );
}

export default App;
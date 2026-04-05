
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-[#f7f9fb]">
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Welcome to Orbit!</h1>
        <p className="mt-2 text-[#424654]">
          Manage your Career journey and tract prospects.
        </p>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
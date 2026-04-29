import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import { Footer } from "@/components/layout/Footer";

import orbitLogo from "@/assets/orbit-logo.svg";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col  bg-[#f5f7fb] px-4 text-center">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex size-10 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#0040a1_0%,#0056d2_100%)] shadow-lg shadow-blue-900/20">
            <img src={orbitLogo} alt="Orbit logo" className="w-5 h-5" />
          </div>
          <span className="font-manrope text-2xl font-extrabold text-blue-800">
            Orbit
          </span>
        </div>

        <h1 className="text-5xl font-bold text-gray-900 mb-2">404</h1>

        <p className="text-gray-500 mb-6 max-w-md">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <Link to="/">
          <Button className="bg-[linear-gradient(135deg,#0040a1_0%,#0056d2_100%)] text-white hover:opacity-90">
            Go to Dashboard
          </Button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

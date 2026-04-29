import { useRouteError, isRouteErrorResponse, Link } from "react-router";

import { Button } from "@/components/ui/button";
import { Footer } from "@/components/layout/Footer";

import orbitLogo from "@/assets/orbit-logo.svg";

export default function ErrorPage() {
  const error = useRouteError();

  let title = "Something went wrong";
  let message = "An unexpected error occurred.";

  if (isRouteErrorResponse(error)) {
    title = `${error.status} Error`;
    message = error.statusText;
  } else if (error instanceof Error) {
    message = error.message;
  }

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

        <h1 className="text-3xl font-semibold text-gray-900 mb-2">{title}</h1>

        <p className="text-gray-500 mb-6 max-w-md">{message}</p>

        <div className="flex gap-3">
          <Link to="/">
            <Button className="bg-[linear-gradient(135deg,#0040a1_0%,#0056d2_100%)] text-white hover:opacity-90">
              Go Home
            </Button>
          </Link>

          <Button variant="outline" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

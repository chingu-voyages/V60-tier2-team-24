import { RouterProvider } from "react-router/dom";
import { Toaster } from "sonner";

import { router } from "@/router";
import { AuthProvider } from "@/context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" />
    </AuthProvider>
  );
}

export default App;

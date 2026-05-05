import { Outlet } from "react-router";
import { ScrollToTop } from "@/components/ScrollToTop";

export function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

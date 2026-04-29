import { Outlet } from "react-router";

import { Footer } from "./Footer";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AuthLayout;

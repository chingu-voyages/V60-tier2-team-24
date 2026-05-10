import { Navigate } from "react-router";

import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  /** If true, redirects authenticated users away (for /login, /register) */
  guestOnly?: boolean;
}

export const ProtectedRoute = ({
  children,
  guestOnly = false,
}: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  // Hold render until Firebase resolves the session —
  // prevents a flash-redirect to /login on refresh for authenticated users
  if (loading) return null;

  if (guestOnly && user) return <Navigate to="/dashboard" replace />;
  if (!guestOnly && !user) return <Navigate to="/auth/login" replace />;

  return <>{children}</>;
};

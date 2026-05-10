import { createBrowserRouter } from "react-router";

import { AppShell } from "@/components/layout/AppShell";
import AuthLayout from "@/components/layout/AuthLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { ApplicationsPage } from "@/pages/ApplicationsPage";
import DashboardPage from "@/pages/DashboardPage";
import LoginPage from "@/pages/LoginPage";
import NotFoundPage from "@/pages/NotFoundPage";
import ErrorPage from "@/pages/ErrorPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import { RegisterPage } from "@/pages/RegisterPage";

import { RootLayout } from "@/components/layout/RootLayout";
import { WelcomePage } from "@/pages/WelcomePage";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute guestOnly>
            <WelcomePage />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: "/auth",
        element: (
          <ProtectedRoute guestOnly>
            <AuthLayout />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "forgot-password",
            element: <ResetPasswordPage />,
          },
          {
            path: "register",
            element: <RegisterPage />,
          },
        ],
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: "applications",
            element: <ApplicationsPage />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

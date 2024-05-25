import { createBrowserRouter } from "react-router-dom";

import { AuthLayout, DashboardLayout } from "@/layouts";
import { LoginPage, OverviewPage, RecordPage, RegisterPage, SalaryPage } from "@/pages";
import ProtectedRoute from "./protected-route";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/dashboard/overview",
        element: <OverviewPage />,
      },
      {
        path: "/dashboard/salary",
        element: <SalaryPage />,
      },
      {
        path: "/dashboard/record",
        element: <RecordPage />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AuthLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
]);

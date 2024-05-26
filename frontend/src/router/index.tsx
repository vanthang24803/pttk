import { createBrowserRouter } from "react-router-dom";

import { AuthLayout, DashboardLayout } from "@/layouts";
import {
  CreateRecordPage,
  LoginPage,
  OverviewPage,
  RecordPage,
  RegisterPage,
  SalaryPage,
  UpdateRecordPage,
  ListSalaryPage,
  CreateSalaryPage,
  UpdateSalaryPage,
} from "@/pages";
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
        path: "/dashboard/salary/:id",
        element: <ListSalaryPage />,
      },
      {
        path: "/dashboard/salary/:id/create",
        element: <CreateSalaryPage />,
      },
      {
        path: "/dashboard/salary/:id/detail/:salaryId",
        element: <UpdateSalaryPage />,
      },
      {
        path: "/dashboard/record",
        element: <RecordPage />,
      },
      {
        path: "/dashboard/record/create",
        element: <CreateRecordPage />,
      },
      {
        path: "/dashboard/record/:id",
        element: <UpdateRecordPage />,
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

import { ToastProvider } from "@/components/providers/toast-provider";
import { Sidebar } from "@/components/sidebar/sidebar";
import useAuth from "@/hooks/use-auth";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export const DashboardLayout = () => {
  const { isLogin, getProfile } = useAuth();

  useEffect(() => {
    if (isLogin) {
      getProfile();
    }
  }, [getProfile, isLogin]);

  return (
    <main className="h-full">
      <ToastProvider />
      <Sidebar />
      <div className="lg:pl-64 p-4">
        <Outlet />
      </div>
    </main>
  );
};

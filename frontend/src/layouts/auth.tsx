import { ToastProvider } from "@/components/providers/toast-provider";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <main className="h-svh flex items-center justify-center bg-[url('https://images.pexels.com/photos/265097/pexels-photo-265097.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-no-repeat bg-center bg-cover">
      <ToastProvider />
      <Outlet />
    </main>
  );
};

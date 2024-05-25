import { ToastProvider } from "@/components/providers/toast-provider";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  

  return (
    <main className="h-svh flex items-center justify-center bg-[url('https://img.freepik.com/free-vector/gradient-connection-background_23-2150516356.jpg?w=1060&t=st=1716534639~exp=1716535239~hmac=e468d6871d4dacafa5da7622613ca616f06bf1f56edb8761866a62d9664972a6')] bg-no-repeat bg-center bg-cover">
      <ToastProvider />
      <Outlet />
    </main>
  );
};

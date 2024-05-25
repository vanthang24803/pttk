import { Modal } from "@/components/modal";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormValue, loginSchema } from "@/schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/use-auth";

export const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { login } = useAuth();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValue) => {
    try {
      setLoading(true);

      const { email, password } = data;

      await login(email, password);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal>
      <div className="flex flex-col space-y-1">
        <h2 className="text-xl font-semibold">Đăng nhập</h2>
        <span className="text-neutral-800 text-[14px]">
          Vui lòng đăng nhập để sử dụng hệ thống quản lý
        </span>
      </div>
      <FormProvider {...form}>
        <form
          className="flex flex-col space-y-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-col space-y-1">
                    <span className="font-medium text-sm">Email</span>
                    <Input
                      {...field}
                      autoComplete="off"
                      placeholder="mail@example.com"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-col space-y-1">
                    <span className="font-semibold text-sm">Password</span>
                    <Input
                      type="password"
                      {...field}
                      autoComplete="off"
                      placeholder="Password"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" variant="primary" disabled={loading}>
            Đăng Nhập
          </Button>
        </form>
      </FormProvider>

      <div className="flex items-center space-x-2 text-sm mb-4">
        <span className="mt-4 text-neutral-600">Bạn chưa có tài khoản?</span>
        <span
          className="mt-4 text-blue-600 hover:cursor-pointer"
          onClick={() => navigate("/register")}
        >
          Tạo tài khoản
        </span>
      </div>
    </Modal>
  );
};

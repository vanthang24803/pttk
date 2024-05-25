import { Modal } from "@/components/modal";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormValue, registerSchema } from "@/schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import _http from "@/utils/http";
import toast from "react-hot-toast";

export const RegisterPage = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstMidName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterFormValue) => {
    try {
      toast.loading("Đang xử lý dữ liệu");
      setLoading(true);
      const res = await _http.post(`/api/auth/register`, data);

      if (res.status === 200) {
        toast.dismiss();
        toast.success("Đăng ký tài khoản thành công!");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Vui lòng thử lại!");
      console.log(error);
    } finally {
      toast.dismiss();
      setLoading(false);
    }
  };

  return (
    <Modal>
      <div className="flex flex-col space-y-1">
        <h2 className="text-xl font-semibold">Đăng ký tài khoản</h2>
        <span className="text-neutral-800 text-[14px]">
          Vui lòng đăng ký để sử dụng hệ thống quản lý
        </span>
      </div>

      <FormProvider {...form}>
        <form
          className="flex flex-col space-y-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstMidName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col space-y-1">
                      <span className="font-semibold text-sm">
                        Họ và tên đệm
                      </span>
                      <Input
                        {...field}
                        autoComplete="off"
                        placeholder="Nguyễn  Văn"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col space-y-1">
                      <span className="font-semibold text-sm">Tên</span>
                      <Input
                        type="text"
                        {...field}
                        autoComplete="off"
                        placeholder="A"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
            Đăng Ký
          </Button>
        </form>
      </FormProvider>

      <div className="flex items-center space-x-2 text-sm mb-4">
        <span className="mt-4 text-neutral-600">Đã có tài khoản?</span>
        <span
          className="mt-4 text-blue-600 hover:cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Đăng nhập
        </span>
      </div>
    </Modal>
  );
};

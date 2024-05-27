import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { salarySchema } from "@/schema";
import { FormValue } from "@/schema/salary.schema";
import { Salary } from "@/types";
import _http from "@/utils/http";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { handlerAmount, price } from "@/utils";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Loading } from "@/components/loading";

export const UpdateSalaryPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const recordId = pathname.split("/").slice(-3, -1)[0];

  const id = pathname.split("/").pop();

  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [salary, setSalary] = useState<Salary | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await _http.get(`/api/salaries/${recordId}/detail/${id}`);

      if (res.status === 200) {
        setSalary(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const form = useForm({
    resolver: zodResolver(salarySchema),
    defaultValues: {
      workDay: "",
      offDay: "",
      benefit: "",
    },
  });

  const watchWorkDay = Number(form.watch("workDay"));
  const watchOffDay = Number(form.watch("offDay"));
  const watchBenefit = Number(form.watch("benefit"));

  useEffect(() => {
    if (salary) {
      form.setValue("benefit", salary.benefit.toString());
      form.setValue("offDay", salary.offDay.toString());
      form.setValue("workDay", salary.workDay.toString());
    }
  }, [form, salary]);

  const onSubmit = async (data: FormValue) => {
    const amount = handlerAmount(
      salary?.base || 0,
      salary?.scale || 0,
      watchBenefit,
      watchWorkDay,
      watchOffDay
    );

    const dataSend = {
      ...data,
      amount,
    };

    try {
      setUpdate(true);
      toast.loading("Đang xử lý dữ liệu!");
      const res = await _http.put(
        `/api/salaries/${recordId}/detail/${id}`,
        dataSend
      );

      if (res.status === 200) {
        navigate(`/dashboard/salary/${recordId}`);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra !");
      console.log(error);
    } finally {
      setUpdate(false);
      toast.dismiss();
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4">
        <div className="flex items-center justify-between">
          <Heading
            title="Chỉnh sửa bảng bảng lương"
            description={`Chỉnh sửa bảng lương ${salary?.id}`}
          />
        </div>
        <Separator />
      </div>
      <FormProvider {...form}>
        <form
          className="p-4 flex flex-col space-y-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="workDay"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col space-y-1">
                      <span className="font-bold text-sm">Số ngày công</span>
                      <Input disabled={update} {...field} autoComplete="off" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="offDay"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col space-y-1">
                      <span className="font-bold text-sm">Số ngày nghỉ</span>
                      <Input disabled={update} {...field} autoComplete="off" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="benefit"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col space-y-1">
                      <span className="font-bold text-sm">Phụ cấp</span>
                      <Input disabled={update} {...field} autoComplete="off" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1">
              <span className="font-semibold text-sm">Lương cơ bản</span>
              <Input value={salary?.base} disabled />
            </div>
            <div className="flex flex-col space-y-1">
              <span className="font-semibold text-sm">Hệ số lương</span>
              <Input value={salary?.scale} disabled />
            </div>
          </div>
          <Button className="w-1/3" type="submit" disabled={update}>
            Xác nhận
          </Button>
          {salary && (
            <div className="flex flex-col space-y-3 pt-12">
              <h2 className="text-xl font-bold">Chi tiết bảng lương</h2>
              <p className="text-sm">- Luơng cơ bản: {price(salary.base)}</p>
              <p className="text-sm">- Hệ số lương: {salary.scale}</p>
              <p className="text-sm">- Ngày công: {watchWorkDay || 0}</p>
              <p className="text-sm">- Ngày nghỉ: {watchOffDay || 0}</p>
              <p className="text-sm">- Phụ cấp: {price(watchBenefit)}</p>
              <h2 className="text-xl font-bold">
                Tổng lương:{" "}
                {price(
                  handlerAmount(
                    salary.base,
                    salary.scale,
                    watchBenefit,
                    watchWorkDay,
                    watchOffDay
                  )
                )}
              </h2>
            </div>
          )}
        </form>
      </FormProvider>
    </div>
  );
};

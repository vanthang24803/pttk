import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { salarySchema } from "@/schema";
import { FormValue } from "@/schema/salary.schema";
import { Record } from "@/types";
import _http from "@/utils/http";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
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

export const CreateSalaryPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const id = pathname.split("/").slice(-2, -1)[0];

  const [loading, setLoading] = useState(false);
  const [record, setRecord] = useState<Record | null>(null);
  const [create, setCreate] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await _http.get(`/api/records/${id}`);

      if (res.status === 200) {
        setRecord(res.data);
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
  }, [id]);

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
    if (record) {
      form.setValue("benefit", record?.benefitSalary.toString());
    }
  }, [form, record]);

  const onSubmit = async (data: FormValue) => {
    const amount = handlerAmount(
      record?.baseSalary || 0,
      record?.salaryScale || 0,
      watchBenefit,
      watchWorkDay,
      watchOffDay
    );

    const dataSend = {
      ...data,
      amount,
      base: record?.baseSalary || 0,
      scale: record?.salaryScale || 0,
    };


    try {
      setCreate(true);
      toast.loading("Đang xử lý dữ liệu!");
      const res = await _http.post(`/api/salaries/${id}`, dataSend);

      if (res.status === 200) {
        navigate(`/dashboard/salary/${id}`);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra !");
      console.log(error);
    } finally {
      setCreate(false);
      toast.dismiss();
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4">
        <div className="flex items-center justify-between">
          <Heading
            title="Tạo bảng lương"
            description={`Khởi tạo bảng lưởng của MNV: ${record?.code}`}
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
                      <Input disabled={create} {...field} autoComplete="off" />
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
                      <Input disabled={create} {...field} autoComplete="off" />
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
                      <Input disabled={create} {...field} autoComplete="off" />
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
              <Input value={record?.baseSalary} disabled />
            </div>
            <div className="flex flex-col space-y-1">
              <span className="font-semibold text-sm">Hệ số lương</span>
              <Input value={record?.salaryScale} disabled />
            </div>
          </div>
          <Button className="w-1/3" type="submit" disabled={create}>
            Xác nhận
          </Button>
          {record && (
            <div className="flex flex-col space-y-3 pt-12">
              <h2 className="text-xl font-bold">Chi tiết bảng lương</h2>
              <p className="text-sm">
                - Luơng cơ bản: {price(record?.baseSalary)}
              </p>
              <p className="text-sm">- Hệ số lương: {record.salaryScale}</p>
              <p className="text-sm">- Ngày công: {watchWorkDay || 0}</p>
              <p className="text-sm">- Ngày nghỉ: {watchOffDay || 0}</p>
              <p className="text-sm">- Phụ cấp: {price(watchBenefit)}</p>
              <h2 className="text-xl font-bold">
                Tổng lương:{" "}
                {price(
                  handlerAmount(
                    record.baseSalary,
                    record.salaryScale,
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

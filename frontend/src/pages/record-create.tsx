import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { Upload } from "@/components/upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { recordSchema, FormValue } from "@/schema";
import { format } from "date-fns";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Department } from "@/types";
import _http from "@/utils/http";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const CreateRecordPage = () => {
  const [url, setUrl] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectFile, setSelectedFile] = useState<File | null>(null);
  const [departments, setDepartments] = useState<Department[] | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await _http.get(`/api/records/department`);
      if (res.status === 200) {
        toast.dismiss();
        setDepartments(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const form = useForm({
    resolver: zodResolver(recordSchema),
    defaultValues: {
      code: "",
      email: "",
      firstMidName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      dateOfBirth: new Date(),
      gender: "men",
      position: "Lecturers",
      degree: "Master",
      salaryScale: "0",
      benefitSalary: "0",
      baseSalary: "0",
      departmentId: "",
    },
  });

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      const fileUrl = URL.createObjectURL(file);
      setUrl(fileUrl);
    }
  };

  const resetImage = () => {
    setUrl("");
  };

  const onSubmit = async (data: FormValue) => {
    if (selectFile) {
      setLoading(true);
      toast.loading("Đang xử lý dữ liệu!");

      const dataSend = new FormData();

      dataSend.append("code", data.code);
      dataSend.append("firstMidName", data.firstMidName);
      dataSend.append("lastName", data.lastName);
      dataSend.append("image", selectFile);
      dataSend.append("phoneNumber", data.phoneNumber);
      dataSend.append("email", data.email);
      dataSend.append("address", data.address);
      dataSend.append("dateOfBirth", data.dateOfBirth.toISOString());
      dataSend.append("gender", data.gender.toString());
      dataSend.append("position", data.position);
      dataSend.append("degree", data.degree);
      dataSend.append("salaryScale", data.salaryScale);
      dataSend.append("benefitSalary", data.benefitSalary);
      dataSend.append("baseSalary", data.baseSalary);
      dataSend.append("departmentId", data.departmentId);

      const res = await _http.post(`/api/records`, dataSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        toast.dismiss();
        setLoading(false);
        navigate("/dashboard/record");
      } else {
        toast.dismiss();
        toast.error("Mã nhân viên hoặc email đã tồn tại");
      }
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4">
        <div className="flex items-center justify-between">
          <Heading title="Tạo hồ sơ" description="Chức năng tạo hồ sơ cán bộ" />
        </div>
        <Separator />
      </div>
      <FormProvider {...form}>
        <form
          className="p-4 flex flex-col space-y-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex justify-between space-x-8">
            <Upload
              url={url}
              handleFileInputChange={handleFileInputChange}
              resetImage={resetImage}
            />
            <div className="w-4/5 flex flex-col space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex flex-col space-y-1">
                          <span className="font-semibold text-sm">
                            Mã nhân viên
                          </span>
                          <Input
                            disabled={loading}
                            {...field}
                            autoComplete="off"
                            placeholder="2121050131"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                            disabled={loading}
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
                            disabled={loading}
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
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex flex-col space-y-1">
                          <span className="font-bold text-sm">Email</span>
                          <Input
                            disabled={loading}
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
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex flex-col space-y-1">
                          <span className="font-bold text-sm">
                            Số điện thoại
                          </span>
                          <Input
                            disabled={loading}
                            {...field}
                            autoComplete="off"
                            placeholder="0987654321"
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
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col space-y-1">
                        <span className="font-bold text-sm">Địa chỉ</span>
                        <Input
                          disabled={loading}
                          {...field}
                          autoComplete="off"
                          placeholder="Hà Nội"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <span className="font-semibold text-sm">Giới tính</span>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || "men"}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn giới tính" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="men">Nam</SelectItem>
                          <SelectItem value="male">Nữ</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="degree"
                  render={({ field }) => (
                    <FormItem>
                      <span className="font-semibold text-sm">Học Vị</span>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || "Master"}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn giới tính" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Master">Thạc sĩ</SelectItem>
                          <SelectItem value="Doctorate">Tiến sĩ</SelectItem>
                          <SelectItem value="AssociateProfessor">
                            Phó giáo sư
                          </SelectItem>
                          <SelectItem value="Professor">Giáo sư</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <span className="font-semibold text-sm">Vị trí</span>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || "Lecturers"}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn giới tính" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Lecturers">Giảng viên</SelectItem>
                          <SelectItem value="DeputyDean">Phó khoa</SelectItem>
                          <SelectItem value="Dean">Trưởng khoa</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="departmentId"
                  render={({ field }) => (
                    <FormItem>
                      <span className="font-semibold text-sm">Khoa</span>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Khoa" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {departments?.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <span className="font-semibold text-sm">
                        Ngày tháng năm sinh
                      </span>
                      <Popover>
                        <PopoverTrigger>
                          <FormControl>
                            <div
                              className={cn(
                                "pl-3 text-left font-normal flex items-center justify-center text-sm border border-input bg-background hover:bg-accent hover:text-accent-foreground p-2 rounded",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "dd/MM/yyyy")
                              ) : (
                                <span className="text-xs">
                                  Chọn ngày, tháng , năm sinh
                                </span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </div>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="baseSalary"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex flex-col space-y-1">
                          <span className="font-bold text-sm">
                            Luơng cơ bản
                          </span>
                          <Input {...field} disabled={loading} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="salaryScale"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex flex-col space-y-1">
                          <span className="font-bold text-sm">Hệ số lương</span>
                          <Input {...field} disabled={loading} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="benefitSalary"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex flex-col space-y-1">
                          <span className="font-bold text-sm">
                            Phụ cấp (nếu có)
                          </span>
                          <Input {...field} disabled={loading} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button className="w-1/3 mt-4" type="submit" disabled={loading}>
                Xác nhận
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { Upload } from "@/components/upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { recordSchema, FormValue } from "@/schema";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const CreateRecordPage = () => {
  const [url, setUrl] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectFile, setSelectedFile] = useState<File | null>(null);

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
      salaryScale: 0,
      benefitSalary: 0,
      baseSalary: 0,
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

  console.log(selectFile);
  const onSubmit = async (data: FormValue) => {
    console.log(data);
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
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

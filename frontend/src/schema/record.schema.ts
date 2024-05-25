import { z } from "zod";

export const recordSchema = z.object({
  code: z.string().length(10, { message: "Mã nhân viên cân 10 chữ số" }),
  firstMidName: z
    .string()
    .min(1, { message: "Hãy nhập Họ và tên đệm của bạn" }),
  lastName: z.string().min(1, { message: "Hãy nhập tên của bạn" }),
  phoneNumber: z
    .string()
    .length(10, { message: "Hãy nhập số điện thoại hợp lệ" }),
  email: z
    .string()
    .min(1, { message: "Email không được bỏ trống" })
    .email({ message: "Email của bạn không hợp lệ" })
    .max(255, { message: "Email quá dài hãy sử 1 email khác" }),
  address: z.string().min(1, { message: "Không được bỏ qua địa chỉ" }),
  dateOfBirth: z.date(),
  gender: z.string(),
  position: z.string().min(1),
  degree: z.string().min(1),
  salaryScale: z.number().min(1),
  benefitSalary: z.number().min(0),
  baseSalary: z.number().min(1),
  departmentId: z.string().min(1),
});


export type FormValue = z.infer<typeof recordSchema>;

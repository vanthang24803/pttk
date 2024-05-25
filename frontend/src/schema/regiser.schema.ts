import { digitRegex, specialCharRegex, uppercaseCharRegex } from "@/utils";
import * as z from "zod";

export const registerSchema = z.object({
  firstMidName: z
    .string()
    .min(1, { message: "Hãy nhập Họ và tên đệm của bạn" }),
  lastName: z.string().min(1, { message: "Hãy nhập tên của bạn" }),
  email: z
    .string()
    .min(1, { message: "Email không được bỏ trống" })
    .email({ message: "Email của bạn không hợp lệ" })
    .max(255, { message: "Email quá dài hãy sử 1 email khác" }),
  password: z
    .string()
    .min(6, {
      message:
        "Mật khẩu của bạn quá ngắn ít nhất 6 chữ cái gồm 1 chữ in hoa, 1 số, 1 ký tự đặc biệt",
    })
    .max(50, "Mật khẩu của bạn quá dài")
    .refine((value) => specialCharRegex.test(value), {
      message: "Mật khẩu của bạn chưa có ký tự đặt biệt",
    })
    .refine((value) => uppercaseCharRegex.test(value), {
      message: "Mật khẩu của bạn chưa có chữ cái in hoa",
    })
    .refine((value) => digitRegex.test(value), {
      message: "Mật khẩu của bạn chưa có chữ số",
    }),
});

export type RegisterFormValue = z.infer<typeof registerSchema>;

import { z } from "zod";

export const salarySchema = z.object({
  workDay: z.string().min(1, { message: "Hãy nhận dữ liệu" }),
  offDay: z.string().min(1, { message: "Hãy nhận dữ liệu" }),
  benefit: z.string().min(1, { message: "Hãy nhận dữ liệu" }),
});

export type FormValue = z.infer<typeof salarySchema>;

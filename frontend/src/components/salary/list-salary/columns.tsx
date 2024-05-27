import { ColumnDef } from "@tanstack/react-table";
import { price } from "@/utils";
import { CellAction } from "./cell-action";

import { getMonth } from "date-fns";

export type Columns = {
  id: string;
  amount: number;
  workDay: number;
  benefit: number;
  base: number;
  scale: number;
  paymentDate: string;
  status: boolean;
  teacherId: string;
};

export const columns: ColumnDef<Columns>[] = [
  {
    accessorKey: "paymentDate",
    header: "Tháng",
    cell: ({ row }) => (
      <p className="mx-2">{getMonth(row.original.paymentDate) + 1}</p>
    ),
  },
  {
    accessorKey: "base",
    header: "Lương cơ bản",
    cell: ({ row }) => <p className="mx-2">{price(row.original.base)}</p>,
  },
  {
    accessorKey: "scale",
    header: "Hệ số lương",
    cell: ({ row }) => <p className="mx-2">{row.original.scale}</p>,
  },
  {
    accessorKey: "benefit",
    header: "Phụ cấp",
    cell: ({ row }) => <p>{price(row.original.benefit)}</p>,
  },
  {
    accessorKey: "amount",
    header: "Thực lĩnh",
    cell: ({ row }) => <p>{price(row.original.amount)}</p>,
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => <p>{row.original.status ? "Đã nhận" : "Chưa nhận"}</p>,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

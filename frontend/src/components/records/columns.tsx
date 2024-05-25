import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Department } from "@/types";

export type Columns = {
  id: string;
  code: string;
  firstMidName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: boolean;
  position: string;
  degree: string;
  departments: Department[];
};

const deereList: { [key: string]: string } = {
  Master: "Thạc sĩ",
  Doctorate: "Tiến sĩ",
  AssociateProfessor: "Phó giáo sư",
  Professor: "Giáo sư",
};

const positionList: { [key: string]: string } = {
  Lecturers: "Giảng viên",
  DeputyDean: "Phó khoa",
  Dean: "Trưởng khoa",
};

export const columns: ColumnDef<Columns>[] = [
  {
    accessorKey: "code",
    header: "Mã nhân viên",
  },
  {
    accessorKey: "firstMidName",
    header: "Họ và tên đệm",
  },
  {
    accessorKey: "lastName",
    header: "Tên",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "gender",
    header: "Giới tính",
    cell: ({ row }) => <p>{row.original.gender ? "Nam" : "Nữ"}</p>,
  },
  {
    accessorKey: "degree",
    header: "Bằng cấp",
    cell: ({ row }) => <p>{deereList[row.original.degree]}</p>,
  },
  {
    accessorKey: "position",
    header: "Chức vụ",
    cell: ({ row }) => <p>{positionList[row.original.position]}</p>,
  },
  {
    accessorKey: "departments",
    header: "Khoa",
    cell: ({ row }) => <p>{row.original.departments[0].name}</p>,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

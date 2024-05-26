import { ColumnDef } from "@tanstack/react-table";
import { Department, Salary } from "@/types";
import { CellAction } from "./cell-action";
import { price } from "@/utils";

export type Columns = {
  id: string;
  code: string;
  firstMidName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: boolean;
  position: string;
  salaryScale: number;
  benefitSalary: number;
  baseSalary: number;
  degree: string;
  departments: Department[];
  salaries: Salary[];
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
    accessorKey: "baseSalary",
    header: "Lương cơ bản",
    cell: ({ row }) => <p className="mx-2">{price(row.original.baseSalary)}</p>,
  },
  {
    accessorKey: "salaryScale",
    header: "Hệ số lương",
    cell: ({ row }) => <p className="mx-2">{row.original.salaryScale}</p>,
  },
  {
    accessorKey: "benefitSalary",
    header: "Phụ cấp",
    cell: ({ row }) => <p>{price(row.original.benefitSalary)}</p>,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

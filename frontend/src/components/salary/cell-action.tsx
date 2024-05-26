"use client";

import { ClipboardList, Edit, MoreHorizontal, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Columns } from "./columns";
import { useNavigate } from "react-router-dom";

interface CellActionProps {
  data: Columns;
}

export const CellAction = ({ data }: CellActionProps) => {
  const navigate = useNavigate();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Chức năng</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => navigate(`/dashboard/salary/${data.id}/create`)}
          >
            <Plus className="mr-2 h-4 w-4" /> Tạo bảng lương
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => navigate(`/dashboard/salary/${data.id}`)}
          >
            <ClipboardList className="mr-2 h-4 w-4" /> Bảng lương
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => navigate(`/dashboard/record/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Xem hồ sơ
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

"use client";

import { useState } from "react";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import _http from "@/utils/http";
import { AlertModal } from "../alert-modal";
import { Columns } from "./columns";
import { useNavigate } from "react-router-dom";

interface CellActionProps {
  data: Columns;
}

export const CellAction = ({ data }: CellActionProps) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onConfirm = async () => {
    toast.loading("Waiting");
    try {
      setLoading(true);
      await _http.delete(`/api/records/${data.id}`);
      toast.dismiss();
      toast.success("Xóa thành công!");
      window.location.reload();
    } catch (error) {
      toast.dismiss();
      console.log(error);
      toast.error("Có lỗi xảy ra!");
    } finally {
      toast.dismiss();
      setOpen(false);
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        title="Bạn chắc chắn muốn xóa chứ"
        description="Hành động này không thể quay lại!"
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Chức năng</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigate(`/dashboard/record/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Cập nhật
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Xóa
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

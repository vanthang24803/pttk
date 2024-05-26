import { Heading } from "@/components/heading";
import { Loading } from "@/components/loading";
import { Separator } from "@/components/ui/separator";
import { Record, Salary } from "@/types";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/records/data-table";
import _http from "@/utils/http";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

export const ListSalaryPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const id = pathname.substring(pathname.lastIndexOf("/") + 1);

  const [salaries, setSalaries] = useState<Salary[] | null>(null);

  const fetchData = async () => {
    const res = await _http.get(`/api/salaries/${id}`);

    if (res.status === 200) {
      console.log(res.data);
    }
  };

  useEffect(() => {
    try {
      setLoading(true);
      fetchData();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="flex-col flex">
      <div className="flex-1 space-y-4 p-4">
        <div className="flex items-center justify-between">
          <Heading title="Bảng lương" description="Danh sách bảng lương" />
          <Button
            variant="default"
            size="icon"
            onClick={() => navigate(`/dashboard/salary/${id}/create`)}
          >
            <Plus />
          </Button>
        </div>
        <Separator />
      </div>
      {/* <div className="overflow-hidden p-4">
        {records?.length && (
          <DataTable searchKey="code" columns={columns} data={records} />
        )}
      </div> */}
    </div>
  );
};

import { Heading } from "@/components/heading";
import { Loading } from "@/components/loading";
import { Separator } from "@/components/ui/separator";
import { Record } from "@/types";
import { useEffect, useState } from "react";

import { columns } from "@/components/salary/columns";
import { DataTable } from "@/components/records/data-table";
import _http from "@/utils/http";

export const SalaryPage = () => {
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState<Record[] | null>(null);

  const fetchData = async () => {
    const res = await _http.get(`/api/records`);

    if (res.status === 200) {
      setRecords(res.data);
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
          <Heading
            title="Quản lý luơng"
            description="Chức năng quản lý lương cán bộ"
          />
        </div>
        <Separator />
      </div>
      <div className="overflow-hidden p-4">
        {records?.length && (
          <DataTable searchKey="code" columns={columns} data={records} />
        )}
      </div>
    </div>
  );
};

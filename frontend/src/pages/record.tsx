import { Heading } from "@/components/heading";
import { Loading } from "@/components/loading";
import { DataTable } from "@/components/records/data-table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Record } from "@/types";
import _http from "@/utils/http";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

import { columns } from "@/components/records/columns";
import { useNavigate } from "react-router-dom";

export const RecordPage = () => {
  const navigate = useNavigate();
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

  return (
    <div className="flex-col flex">
      <div className="flex-1 space-y-4 p-4">
        <div className="flex items-center justify-between">
          <Heading
            title="Quản lý hồ sơ"
            description="Chức năng quản lý hồ sơ cán bộ"
          />
          <Button
            variant="default"
            size="icon"
            onClick={() => navigate(`/dashboard/record/create`)}
          >
            <Plus />
          </Button>
        </div>
        <Separator />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="overflow-hidden p-4">
          {records?.length && (
            <DataTable searchKey="code" columns={columns} data={records} />
          )}
        </div>
      )}
    </div>
  );
};

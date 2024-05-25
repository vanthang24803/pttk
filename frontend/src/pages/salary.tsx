import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";

export const SalaryPage = () => {
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
    </div>
  );
};

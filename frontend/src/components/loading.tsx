import { LoaderCircle } from "lucide-react";

export const Loading = () => {
  return (
    <div className="flex items-center justify-center h-[50vh]">
      <LoaderCircle className="w-10 h-10 animate-spin text-sky-600" />
    </div>
  );
};

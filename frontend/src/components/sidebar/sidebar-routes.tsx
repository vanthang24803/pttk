import { BarChart , BadgeDollarSign , Folder  } from "lucide-react";
import { SidebarItem } from "./sidebar-item";

const routes = [
  // {
  //   label: "Tổng quát",
  //   icon: BarChart,
  //   href: "/dashboard/overview",
  // },
  {
    label: "Hồ sơ ",
    icon: Folder,
    href: "/dashboard/record",
  },
  {
    label: "Lương",
    icon: BadgeDollarSign,
    href: "/dashboard/salary",
  },
];

export const SidebarRoute = () => {
  return (
    <div className="flex flex-col w-full">
      {routes.map((item, index) => (
        <SidebarItem
          key={index}
          icon={item.icon}
          label={item.label}
          href={item.href}
        />
      ))}
    </div>
  );
};

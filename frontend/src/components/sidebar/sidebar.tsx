import { Logo } from "../logo";
import { SidebarRoute } from "./sidebar-routes";
import { UserMenu } from "./user-menu";

export const Sidebar = () => {
  return (
    <div className="flex h-full w-60 flex-col fixed inset-y-0 z-50">
      <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm light:bg-neutral-50/80">
        <div className="px-6 py-4 flex items-center justify-center">
          <Logo />
        </div>
        <div className="flex flex-col w-full mt-3">
          <SidebarRoute />
        </div>
        <UserMenu />
      </div>
    </div>
  );
};

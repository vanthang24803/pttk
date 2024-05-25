import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuth from "@/hooks/use-auth";
import { LogOut } from "./logout";

export const UserMenu = () => {
  const { profile } = useAuth();

  if (!profile) return null;

  return (
    <div className="flex-end mt-auto px-4 py-4">
      <div className="flex items-center justify-between hover:cursor-pointer">
        <Avatar>
          <AvatarImage src={profile.avatar} />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium">
          {profile.firstMidName} {profile.lastName}
        </span>
        <LogOut />
      </div>
    </div>
  );
};

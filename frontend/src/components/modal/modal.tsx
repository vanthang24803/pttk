import { PropsWithChildren } from "react";
import { Logo } from "../logo";

export const Modal = ({ children }: PropsWithChildren) => {
  return (
    <div className="md:w-[460px] w-[360px] py-4 px-6 bg-white/90 rounded-lg  flex flex-col space-y-5">
      <Logo />
      <div className="flex flex-col space-y-4">{children}</div>
    </div>
  );
};

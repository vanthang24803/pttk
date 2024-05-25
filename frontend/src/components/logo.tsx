import Image from "@/assets/humg-logo.svg";
export const Logo = () => {

  return (
    <img
      src={Image}
      alt="logo"
      className="w-12 h-12 object-fill hover:cursor-pointer"
    />
  );
};

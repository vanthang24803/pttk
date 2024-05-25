type HeadingProps = {
  title: string;
  description?: string;
};

export const Heading = ({ title, description }: HeadingProps) => {
  return (
    <div className="flex flex-col space-y-1">
      <h2 className="text-3xl font-semibold tracking-tight ">{title}</h2>
      <p className="text-[13px] text-muted-foreground">{description}</p>
    </div>
  );
};

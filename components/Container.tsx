import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: Props) => {
  return (
    <div className={cn("max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 2xl:px-12", className)}>
      {children}
    </div>
  );
};

export default Container;

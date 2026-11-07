import { cn } from "@/lib/utils";
import TechIcon from "./tech-icon";

const TechPill = ({ name, className }: { name: string; className?: string }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium",
        className,
      )}
    >
      <TechIcon name={name} className="h-3.5 w-3.5" />
      {name}
    </span>
  );
};

export default TechPill;

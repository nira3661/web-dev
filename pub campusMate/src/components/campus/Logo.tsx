import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <Link to="/" className={cn("flex items-center gap-2.5", className)}>
      <span className="grid h-9 w-9 place-items-center rounded-md bg-accent font-display text-lg font-bold text-accent-foreground">
        C
      </span>
      <span className="leading-tight">
        <span
          className={cn(
            "block font-display text-lg font-semibold",
            light ? "text-sidebar-foreground" : "text-foreground",
          )}
        >
          CampusMate
        </span>
        <span
          className={cn(
            "block text-[10px] font-semibold uppercase tracking-[0.18em]",
            light ? "text-sidebar-foreground/60" : "text-muted-foreground",
          )}
        >
          PUB · CSE
        </span>
      </span>
    </Link>
  );
}

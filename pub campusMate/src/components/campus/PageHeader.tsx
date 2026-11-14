import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string | undefined;
  title: string;
  description?: string | undefined;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-widest text-brick">{eyebrow}</p>
        )}
        <h1 className="mt-1 text-3xl font-semibold md:text-4xl">{title}</h1>
        {description && <p className="mt-2 max-w-2xl text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  tone = "default",
}: {
  label: string;
  value: ReactNode;
  hint?: string | undefined;
  tone?: "default" | "accent" | "warn" | "danger" | undefined;
}) {
  const toneCls = {
    default: "bg-card",
    accent: "bg-primary text-primary-foreground",
    warn: "bg-warning/25",
    danger: "bg-destructive/10",
  }[tone];
  return (
    <div className={`rounded-xl border border-border p-5 shadow-soft ${toneCls}`}>
      <p
        className={`text-xs font-semibold uppercase tracking-wider ${tone === "accent" ? "text-primary-foreground/70" : "text-muted-foreground"}`}
      >
        {label}
      </p>
      <p className="mt-2 font-display text-3xl font-semibold">{value}</p>
      {hint && (
        <p
          className={`mt-1 text-sm ${tone === "accent" ? "text-primary-foreground/75" : "text-muted-foreground"}`}
        >
          {hint}
        </p>
      )}
    </div>
  );
}

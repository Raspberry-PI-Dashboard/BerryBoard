import clsx from "clsx";
import type { HTMLAttributes, ReactNode } from "react";

export function Section({
  children,
  className,
  Title,
  Accessory,
}: HTMLAttributes<HTMLElement> & {
  Title?: React.ReactNode;
  Accessory?: React.ReactNode;
}) {
  return (
    <section
      className={clsx(
        "mx-auto w-full max-w-2xl",
        "rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl",
        "p-4 sm:p-8",
        // "flex flex-col gap-6 items-start",
        className,
      )}
    >
      {(Title || Accessory) && (
        <div className="mb-8 flex items-center justify-between gap-4">
          <SectionTitle>{Title}</SectionTitle>
          <SectionAccessory>{Accessory}</SectionAccessory>
        </div>
      )}

      {children}
    </section>
  );
}

export function SectionTitle({
  children,
  className,
}: HTMLAttributes<HTMLElement>) {
  return (
    <p
      className={clsx(
        "mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionAccessory({
  children,
  className,
}: HTMLAttributes<HTMLElement>) {
  return <div className={clsx("px-3 py-1", className)}>{children}</div>;
}

export function SectionError({
  className,
  children,
  Title,
  ...props
}: HTMLAttributes<HTMLElement> & { Title?: ReactNode }) {
  return (
    <div
      className={clsx(
        "mt-3 px-3 py-2",
        "rounded-lg border border-red-900 bg-red-950/50",
        "text-sm text-red-300",
        className,
      )}
      role="alert"
      {...props}
    >
      {Title && (
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-[0.15em] text-red-300">
          {Title}
        </h2>
      )}
      {children}
    </div>
  );
}

export function CardPanel({
  className,
  children,
  Title,
  ...props
}: HTMLAttributes<HTMLElement> & { Title?: ReactNode }) {
  return (
    <div
      className={clsx(
        "overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden",
        "rounded-lg border border-slate-800",
        "bg-slate-950",
        "p-4",
        "font-mono text-sm text-slate-300",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function Subsection({
  className,
  children,
  subtitle,
  ...props
}: HTMLAttributes<HTMLElement> & { subtitle?: ReactNode }) {
  return (
    <div
      className={clsx(
        "rounded-lg border border-slate-800 bg-slate-950 p-4",
        className,
      )}
      {...props}
    >
      {subtitle && (
        <div className="mb-4">
          <span className="text-sm font-semibold text-cyan-400">
            {subtitle}
          </span>
        </div>
      )}
      {children}
    </div>
  );
}

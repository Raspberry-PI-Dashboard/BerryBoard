import clsx from "clsx";
import type { PropsWithChildren } from "react";

export function Section({
  children,
  className,
}: PropsWithChildren & { className?: string }) {
  return (
    <section
      className={clsx(
        className,
        "mx-auto w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl",
      )}
    >
      {children}
    </section>
  );
}

export function SectionTitle({
  children,
  className,
}: PropsWithChildren & { className?: string }) {
  return (
    <p
      className={clsx(
        className,
        "mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400",
      )}
    >
      {children}
    </p>
  );
}

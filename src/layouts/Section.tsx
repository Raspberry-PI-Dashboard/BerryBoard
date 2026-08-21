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

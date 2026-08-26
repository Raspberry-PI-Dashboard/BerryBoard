import clsx from "clsx";
import type { HTMLAttributes } from "react";

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
        "p-8",
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
  return (
    <div
      className={clsx(
        "px-3 py-1",
        className,
      )}
    >
      {children}
    </div>
  );
}

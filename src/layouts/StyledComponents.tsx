import clsx from "clsx";
import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
} from "react";

type ButtonVariant = "primary" | "secondary" | "filled";

const ButtonVariantsClasses: Record<ButtonVariant, string | string[]> = {
  primary: [
    "rounded-lg border border-cyan-400",
    "px-4 py-2",
    "text-sm font-semibold text-cyan-300",
    "disabled:cursor-not-allowed disabled:opacity-40",
  ],
  secondary: [
    "rounded-lg border border-slate-700",
    "px-3 py-2",
    "text-sm text-slate-300",
    "disabled:cursor-not-allowed disabled:opacity-40",
  ],
  filled: [
    "rounded-lg bg-cyan-400",
    "px-5 py-2",
    "font-semibold text-slate-950",
    "disabled:cursor-not-allowed disabled:opacity-40",
  ],
};

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  const styledClasses = ButtonVariantsClasses[variant];

  return <button className={clsx(styledClasses, className)} {...props} />;
}

export function Input({
  className,
  label,
  id,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  if (label) {
    return (
      <>
        <label className="block text-sm text-slate-400" htmlFor={id}>
          {label}
        </label>
        <input
          className={clsx(
            "min-w-0 flex-1",
            "rounded-lg border border-slate-700 outline-none",
            "bg-slate-950",
            "px-3 py-2",
            "font-mono text-slate-100",
            "focus:border-cyan-400",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          id={id}
          {...props}
        />
      </>
    );
  }

  return (
    <input
      className={clsx(
        "min-w-0 flex-1",
        "rounded-lg border border-slate-700 outline-none",
        "bg-slate-950",
        "px-3 py-2",
        "font-mono text-slate-100",
        "focus:border-cyan-400",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      id={id}
      {...props}
    />
  );
}

export function Badge({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={clsx(
        "rounded-full border border-slate-700",
        "px-2 p-1",
        "text-sm text-slate-300",
        className,
      )}
      {...props}
    />
  );
}

import clsx from "clsx";
import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
} from "react";

type ButtonVariant = "primary" | "secondary" | "filled";

const ButtonVariantClasses: Record<ButtonVariant, string | string[]> = {
  primary: [
    "rounded-lg border border-cyan-400",
    "font-semibold text-cyan-300",
    "disabled:cursor-not-allowed disabled:opacity-40",
  ],
  secondary: [
    "rounded-lg border border-slate-700",
    "text-slate-300",
    "disabled:cursor-not-allowed disabled:opacity-40",
  ],
  filled: [
    "rounded-lg bg-cyan-400",
    "font-semibold text-slate-950",
    "disabled:cursor-not-allowed disabled:opacity-40",
  ],
};

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return (
    <button
      className={clsx("px-4 py-2", ButtonVariantClasses[variant], className)}
      {...props}
    />
  );
}

export function Input({
  className,
  label,
  id,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  if (label) {
    return (
      <div>
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
      </div>
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

type BadgeVariant = "ok" | "warning" | "error";

export function Badge({
  className,
  variant = "ok",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant }) {
  return (
    <span
      className={clsx(
        "rounded-full border border-slate-700",
        "px-2 p-1",
        "text-sm text-slate-300",
        variant === "ok" && "bg-green-800",
        variant === "warning" && "bg-amber-500",
        variant === "error" && "border-red-900 bg-red-950 text-red-300",
        className,
      )}
      {...props}
    />
  );
}

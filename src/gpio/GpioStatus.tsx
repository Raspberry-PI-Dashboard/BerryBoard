import { CardPanel } from "../layouts/Section";
import clsx from "clsx";
import type { ReactNode } from "react";
import { useGpioUI } from "./useGpioUI";

export function GpioStatus({
  pin,
  children,
}: {
  pin: number;
  children?: ReactNode;
}) {
  const {
    getPinLabel,
    getPinMode,
    getPinStatus,
    getPinValue,
    isConnected,
  } = useGpioUI();
  const value = getPinValue(pin);

  return (
    <CardPanel
      className="relative flex min-h-28 w-full flex-col gap-4"
      key={pin}
    >
      <div className="flex w-full items-center justify-between gap-3 pt-1">
        <div
          className={clsx(
            "absolute inset-x-0 top-0 h-1",
            isConnected ? "bg-green-500" : "bg-red-500",
          )}
        />
        <div className="min-w-0">
          <span className="block whitespace-nowrap font-mono text-lg text-slate-100">
            {getPinLabel(pin)}
          </span>
          <span className="block text-xs uppercase tracking-wide text-slate-500">
            {getPinMode(pin)}
          </span>
        </div>
        {typeof value === "boolean" ? (
          <div className="flex items-center gap-3 rounded-full border border-slate-800 bg-slate-950/70 px-3 py-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {value ? "High" : "Low"}
            </span>
            <span
              aria-label={value ? "High" : "Low"}
              className={clsx(
                "h-5 w-5 rounded-full border-2 border-slate-700 shadow-inner transition-colors",
                value
                  ? "bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.8)]"
                  : "bg-red-400 shadow-[0_0_12px_rgba(248,113,113,0.8)]",
              )}
              role="img"
            />
          </div>
        ) : (
          <span className="min-w-0 max-w-1/2 truncate rounded-md border border-slate-800 px-2 py-1 text-sm text-slate-400">
            {getPinStatus(pin)}
          </span>
        )}
      </div>
      {children}
    </CardPanel>
  );
}

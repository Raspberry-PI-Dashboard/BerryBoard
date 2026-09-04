import { CardPanel } from "../layouts/Section";
import clsx from "clsx";
import { useGpioUI } from "./useGpioUI";

export function GpioStatus({ pin }: { pin: number }) {
  const { getPinLabel, getPinStatus, isConnected } = useGpioUI();

  return (
    <CardPanel className="relative flex min-h-28 w-full items-center" key={pin}>
      <div className="flex w-full items-center justify-between gap-3 pt-1">
        <div
          className={clsx(
            "absolute inset-x-0 top-0 h-1",
            isConnected ? "bg-green-500" : "bg-red-500",
          )}
        />
        <span className="whitespace-nowrap font-mono text-lg text-slate-100">
          {getPinLabel(pin)}
        </span>
        <span className="min-w-0 max-w-1/2 truncate rounded-md border border-slate-800 px-2 py-1 text-sm text-slate-400">
          {getPinStatus(pin)}
        </span>
      </div>
    </CardPanel>
  );
}

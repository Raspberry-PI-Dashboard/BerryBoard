import { CardPanel } from "../layouts/Section";
import clsx from "clsx";
import { useGpioUI } from "./useGpioUI";

export function GpioStatus({ pin }: { pin: number }) {
  const { getPinLabel, getPinStatus, isConnected } = useGpioUI();

  return (
    <CardPanel className="flex items-center justify-between w-40" key={pin}>
      <div className="flex flex-col items-start gap-2">
        <div
          className={clsx(
            "h-2 w-8 rounded-full font-bold mb-2",
            isConnected ? "bg-green-500" : "bg-red-500",
          )}
        />
        <span className="font-mono text-lg text-slate-100">
          {getPinLabel(pin)}
        </span>
        <span className="text-sm text-slate-400">{getPinStatus(pin)}</span>
      </div>
    </CardPanel>
  );
}

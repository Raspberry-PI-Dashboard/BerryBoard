import { CardPanel, Section } from "../layouts/Section";
import { useGpioContext } from "../context/GpioContext";
import clsx from "clsx";

export function GpioMonitor() {
  const {
    getPinLabel,
    getPinStatus,
    isConnected,
    allowedPins,
    refreshInterval,
  } = useGpioContext();

  return (
    <Section
      Title="GPIO Monitoring"
      Accessory={"update: " + refreshInterval + "s"}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {allowedPins.map((pin) => {
          return (
            <CardPanel
              className="flex items-center justify-between w-40"
              key={pin}
            >
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
                <span className="text-sm text-slate-400">
                  {getPinStatus(pin)}
                </span>
              </div>
            </CardPanel>
          );
        })}
      </div>
    </Section>
  );
}

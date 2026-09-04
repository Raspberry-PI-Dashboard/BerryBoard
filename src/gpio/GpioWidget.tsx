import { CardPanel, Section } from "../layouts/Section";
import { Button } from "../layouts/StyledComponents";
import { useGpioUI } from "./useGpioUI";

export function GpioWidget() {
  const { monitoredPins } = useGpioUI();
  const pins = [...monitoredPins]
    .filter(([, monitored]) => monitored)
    .map(([pin]) => pin);

  return (
    <Section className="h-full" Title="Monitored GPIO">
      {pins.length === 0 ? (
        <p className="text-sm text-slate-500">No GPIO pins are being monitored.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {pins.map((pin) => (
            <MonitoredPin key={pin} pin={pin} />
          ))}
        </div>
      )}
    </Section>
  );
}

function MonitoredPin({ pin }: { pin: number }) {
  const {
    getPinLabel,
    getPinMode,
    getPinModeValue,
    getPinStatus,
    getPinValue,
    isConnected,
    pwmPins,
    setPin,
    setPinPWM,
    togglePin,
  } = useGpioUI();
  const mode = getPinModeValue(pin);
  const value = getPinValue(pin);

  return (
    <CardPanel className="flex min-h-32 flex-col justify-between gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="block whitespace-nowrap font-mono text-lg text-slate-100">
            {getPinLabel(pin)}
          </span>
          <span className="block text-xs uppercase tracking-wide text-slate-500">
            {getPinMode(pin)}
          </span>
        </div>
        <span className="min-w-0 max-w-1/2 truncate rounded-md border border-slate-800 px-2 py-1 text-sm text-slate-400">
          {getPinStatus(pin)}
        </span>
      </div>

      {mode === "input" && typeof value === "boolean" && (
        <div
          aria-label={value ? "High" : "Low"}
          className={`mx-auto h-16 w-16 rounded-full border-4 border-slate-800 ${value ? "bg-green-500" : "bg-red-500"}`}
          role="img"
        />
      )}

      {mode === "output" && (
        <fieldset className="flex flex-wrap gap-2" disabled={!isConnected}>
          <Button onClick={() => setPin(pin, true)} type="button">
            High
          </Button>
          <Button onClick={() => setPin(pin, false)} type="button">
            Low
          </Button>
          <Button onClick={() => togglePin(pin)} type="button">
            Toggle
          </Button>
        </fieldset>
      )}

      {mode === "pwm" && pwmPins.includes(pin) && (
        <fieldset className="flex flex-wrap gap-2" disabled={!isConnected}>
          {[0, 25, 50, 75, 100].map((dutyCycle) => (
            <Button
              key={dutyCycle}
              onClick={() => setPinPWM(pin, dutyCycle)}
              type="button"
            >
              {dutyCycle}%
            </Button>
          ))}
        </fieldset>
      )}
    </CardPanel>
  );
}
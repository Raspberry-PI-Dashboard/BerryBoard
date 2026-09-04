import { Section } from "../layouts/Section";
import { Button } from "../layouts/StyledComponents";
import { GpioStatus } from "./GpioStatus";
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
  const { getPinModeValue, isConnected, pwmPins, setPin, setPinPWM, togglePin } =
    useGpioUI();
  const mode = getPinModeValue(pin);

  return (
    <GpioStatus pin={pin}>
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
    </GpioStatus>
  );
}
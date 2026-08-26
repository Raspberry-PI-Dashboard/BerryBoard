import { Section } from "../layouts/Section";
import { useGpio } from "../hooks/useGpio";
import { Button } from "../layouts/StyledComponents";

export function GpioStatus() {
  const { getPinLabel, updatePinout, readPin, isConnected, allowedPins } =
    useGpio();

  return (
    <Section
      Title="GPIO inputs"
      Accessory={
        <Button disabled={!isConnected} onClick={updatePinout} type="button">
          Refresh
        </Button>
      }
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {allowedPins.map((pin) => {
          return (
            <div
              className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 p-4"
              key={pin}
            >
              <div>
                <div className="font-mono text-lg text-slate-100">
                  GPIO {pin}
                </div>
                <div className="mt-1 text-sm text-slate-400">
                  {getPinLabel(pin)}
                </div>
              </div>
              <Button
                aria-label={`Read GPIO ${pin}`}
                disabled={!isConnected}
                onClick={() => readPin(pin)}
                type="button"
                variant="secondary"
              >
                Read
              </Button>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

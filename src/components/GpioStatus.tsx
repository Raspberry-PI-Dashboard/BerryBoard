import { CardPanel, Section } from "../layouts/Section";
import { useGpio } from "../hooks/useGpio";
import { Button } from "../layouts/StyledComponents";

export function GpioStatus() {
  const {
    getPinLabel,
    getPinStatus,
    updatePinout,
    readPin,
    isConnected,
    allowedPins,
  } = useGpio();

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
            <CardPanel className="flex items-center justify-between" key={pin}>
              <div>
                <p className="font-mono text-lg text-slate-100">
                  {getPinLabel(pin)}
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  {getPinStatus(pin)}
                </p>
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
            </CardPanel>
          );
        })}
      </div>
    </Section>
  );
}

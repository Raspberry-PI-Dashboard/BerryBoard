import { CardPanel, Section } from "../layouts/Section";
import { Button } from "../layouts/StyledComponents";
import { useGpioContext } from "../context/GpioContext";

export function GpioStatus() {
  const {
    getPinLabel,
    getPinStatus,
    readPin,
    isConnected,
    allowedPins,
    refreshInterval,
  } = useGpioContext();
  return (
    <Section Title="GPIO inputs" Accessory={"update: " + refreshInterval + "s"}>
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

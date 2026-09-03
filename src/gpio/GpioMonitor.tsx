import { Section } from "../layouts/Section";
import { GpioStatus } from "./GpioStatus";
import { useGpio } from "../hooks/useGpio";

export function GpioMonitor() {
  const { allowedPins, refreshInterval } = useGpio();

  return (
    <Section
      Title="GPIO Monitoring"
      Accessory={"update: " + refreshInterval + "s"}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {allowedPins.map((pin) => {
          return <GpioStatus pin={pin} />;
        })}
      </div>
    </Section>
  );
}

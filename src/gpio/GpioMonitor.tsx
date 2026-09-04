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
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,10rem),1fr))] gap-3">
        {allowedPins.map((pin) => {
          return <GpioStatus key={pin} pin={pin} />;
        })}
      </div>
    </Section>
  );
}

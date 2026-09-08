import { Section } from "../layouts/Section";
import { GpioStatus } from "./GpioStatus";
import { useGpio } from "../hooks/useGpio";

export function GpioMonitor() {
  const { allowedPins, refreshInterval } = useGpio();

  return (
    <Section
      className="flex h-full flex-col"
      Title="GPIO Pinout"
      Accessory={"update: " + refreshInterval + "s"}
    >
      <div className="grid flex-1 auto-rows-fr grid-cols-[repeat(auto-fit,minmax(min(100%,10rem),1fr))] gap-4">
        {allowedPins.map((pin) => {
          return <GpioStatus key={pin} pin={pin} />;
        })}
      </div>
    </Section>
  );
}

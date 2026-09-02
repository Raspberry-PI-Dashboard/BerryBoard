import { Section } from "../layouts/Section";
import { useGpioContext } from "../context/GpioContext";
import { GpioStatus } from "./GpioStatus";

export function GpioMonitor() {
  const { allowedPins, refreshInterval } = useGpioContext();

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

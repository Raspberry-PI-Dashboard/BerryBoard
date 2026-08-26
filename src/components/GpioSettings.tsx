import { Section } from "../layouts/Section";
import { Input } from "../layouts/StyledComponents";
import { useGpioContext } from "../context/GpioContext";

export function GpioSettings() {
  const { refreshInterval, setRefreshInterval } = useGpioContext();

  return (
    <Section Title="GPIO monitoring">
      <Input
        aria-label="GPIO refresh interval in seconds"
        className="w-24"
        label="Refresh interval (s)"
        min={1}
        onChange={(event) => {
          setRefreshInterval(
            Math.max(1, Number(event.target.value) || 1),
          );
        }}
        type="number"
        value={refreshInterval}
      />
    </Section>
  );
}

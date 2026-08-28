import { Section } from "../layouts/Section";
import { Input } from "../layouts/StyledComponents";
import { useGpioContext } from "../context/GpioContext";

export function GpioSettings() {
  const {
    refreshInterval,
    setRefreshInterval,
    allowedPins,
    monitoredPins,
    setMonitoredPins,
  } = useGpioContext();

  function updateMonitoredPins(
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
    pin: number,
  ) {
    const checkboxValue = e.target.checked;
    monitoredPins.set(pin, checkboxValue);
    setMonitoredPins(monitoredPins);
  }

  return (
    <Section Title="GPIO Settings">
      <Input
        aria-label="GPIO refresh interval in seconds"
        className="w-24"
        label="Refresh interval (s)"
        min={1}
        onChange={(event) => {
          setRefreshInterval(Math.max(1, Number(event.target.value) || 1));
        }}
        type="number"
        value={refreshInterval}
      />

      <span>Monitor pins</span>
      <div className="flex gap-4">
        {allowedPins.map((pin) => {
          return (
            <div>
              <span> {pin} </span>
              <Input
                type="checkbox"
                onChange={(e) => updateMonitoredPins(e, pin)}
              />
            </div>
          );
        })}
      </div>
    </Section>
  );
}

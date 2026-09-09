import { Section, Subsection } from "../layouts/Section";
import { Checkbox, Input } from "../layouts/StyledComponents";
import { useGpioUI } from "./useGpioUI";

export function GpioConfiguration() {
  const {
    refreshInterval,
    setRefreshInterval,
    allowedPins,
    monitoredPins,
    setMonitoredPins,
    isConnected,
  } = useGpioUI();

  function updateMonitoredPins(
    event: React.ChangeEvent<HTMLInputElement>,
    pin: number,
  ) {
    const checkboxValue = event.target.checked;
    monitoredPins.set(pin, checkboxValue);
    setMonitoredPins(monitoredPins);
  }

  return (
    <Section Title="GPIO Configuration">
      <div className="flex flex-col gap-6">
        <fieldset className="contents" disabled={!isConnected}>
          <Subsection subtitle="Monitoring">
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
          </Subsection>
        </fieldset>

        <div className="theme-divider" />

        <fieldset className="contents" disabled={!isConnected}>
          <Subsection subtitle="Select which pins to monitor">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(6rem,1fr))] gap-3">
              {allowedPins.map((pin) => (
                <div className="flex min-w-0" key={pin}>
                  <Checkbox
                    checked={monitoredPins.get(pin) ?? false}
                    label={`GPIO ${pin}`}
                    type="checkbox"
                    onChange={(event) => updateMonitoredPins(event, pin)}
                  />
                </div>
              ))}
            </div>
          </Subsection>
        </fieldset>
      </div>
    </Section>
  );
}

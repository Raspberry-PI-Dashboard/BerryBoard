import { CardPanel, Section, Subsection } from "../layouts/Section";
import { Button, Input } from "../layouts/StyledComponents";
import { useGpioUI } from "./useGpioUI";

export function GpioSettings() {
  const {
    refreshInterval,
    setRefreshInterval,
    allowedPins,
    monitoredPins,
    setMonitoredPins,
  } = useGpioUI();

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
      <Subsection>
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

      <Subsection subtitle="Select which pins to monitor">
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
      </Subsection>

      <Subsection subtitle="Pins settings">
        <div className="grid grid-col-1 gap-4">
          {allowedPins.map((pin) => {
            return <GpioActions pin={pin} />;
          })}
        </div>
      </Subsection>
    </Section>
  );
}

export function GpioActions({ pin }: { pin: number }) {
  const { setPin, setPinPWM, togglePin, stopPinPWM, isConnected } = useGpioUI();

  return (
    <CardPanel>
      <fieldset className="flex flex-col gap-4" disabled={!isConnected}>
        <div>GPIO {pin} Actions</div>
        <div className="flex gap-4">
          <Button onClick={() => setPin(pin, true)}>Set High</Button>
          <Button onClick={() => setPin(pin, false)}>Set Low</Button>
          <Button onClick={() => togglePin(pin)}>Toggle</Button>
        </div>

        <div className="flex gap-4">
          <Button onClick={() => setPinPWM(pin, 50)}>PWM 50%</Button>
          <Button onClick={() => setPinPWM(pin, 75)}>PWM 75%</Button>
          <Button onClick={() => setPinPWM(pin, 100)}>PWM 100%</Button>
          <Button onClick={() => stopPinPWM(pin)}>Stop PWM</Button>
        </div>
      </fieldset>
    </CardPanel>
  );
}

import { Section } from "../layouts/Section";
import { Input } from "../layouts/StyledComponents";
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

      <span>Pins settings</span>
      <div className="flex gap-4">
        {allowedPins.map((pin) => {
          return <GpioActions pin={pin} />;
        })}
      </div>
    </Section>
  );
}

export function GpioActions({ pin }: { pin: number }) {
  const { setPin, setPinPWM, togglePin, stopPinPWM } = useGpioUI();

  return (
    <Section Title={"GPIO " + pin + " Actions"}>
      <div className="flex gap-4">
        <button onClick={() => setPin(pin, true)}>Set High</button>
        <button onClick={() => setPin(pin, false)}>Set Low</button>
        <button onClick={() => togglePin(pin)}>Toggle</button>
        <button onClick={() => setPinPWM(pin, 50)}>Set PWM 50%</button>
        <button onClick={() => setPinPWM(pin, 75)}>Set PWM 75%</button>
        <button onClick={() => setPinPWM(pin, 100)}>Set PWM 100%</button>
        <button onClick={() => stopPinPWM(pin)}>Stop PWM</button>
      </div>
    </Section>
  );
}

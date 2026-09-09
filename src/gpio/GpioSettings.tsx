import { CardPanel, Section, Subsection } from "../layouts/Section";
import { Button, Select } from "../layouts/StyledComponents";
import { useGpioUI } from "./useGpioUI";

export function GpioSettings() {
  const {
    pwmPins,
    selectedPwmPin,
    setSelectedPwmPin,
    isConnected,
  } = useGpioUI();

  return (
    <Section Title="PWM Settings">
      <div className="flex flex-col gap-6">
        <fieldset className="contents" disabled={!isConnected}>
          <Subsection subtitle="PWM calibration">
        <Select
          id="calibration-pin"
          label="PWM pin"
          onChange={(event) => setSelectedPwmPin(Number(event.target.value))}
          value={selectedPwmPin}
        >
          {pwmPins.map((pin) => (
            <option key={pin} value={pin}>
              GPIO {pin}
            </option>
          ))}
        </Select>
          </Subsection>
        </fieldset>

      </div>
    </Section>
  );
}

export function GpioActions({ pin }: { pin: number }) {
  const {
    setPin,
    setPinPWM,
    togglePin,
    stopPinPWM,
    isConnected,
    pwmPins,
  } = useGpioUI();
  const supportsPwm = pwmPins.includes(pin);

  return (
    <CardPanel>
      <fieldset className="flex flex-col gap-4" disabled={!isConnected}>
        <div>GPIO {pin} Actions</div>
        <div className="flex gap-4">
          <Button onClick={() => setPin(pin, true)}>Set High</Button>
          <Button onClick={() => setPin(pin, false)}>Set Low</Button>
          <Button onClick={() => togglePin(pin)}>Toggle</Button>
        </div>

        {supportsPwm && (
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => setPinPWM(pin, 50)}>PWM 50%</Button>
            <Button onClick={() => setPinPWM(pin, 75)}>PWM 75%</Button>
            <Button onClick={() => setPinPWM(pin, 100)}>PWM 100%</Button>
            <Button onClick={() => stopPinPWM(pin)}>Stop PWM</Button>
          </div>
        )}
      </fieldset>
    </CardPanel>
  );
}

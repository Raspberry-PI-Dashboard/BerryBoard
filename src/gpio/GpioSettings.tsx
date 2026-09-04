import { useEffect, useState } from "react";
import type { PinMode } from "../ws/protocol";
import { CardPanel, Section, Subsection } from "../layouts/Section";
import { Button, Input } from "../layouts/StyledComponents";
import { useGpioUI } from "./useGpioUI";

export function GpioSettings() {
  const {
    refreshInterval,
    setRefreshInterval,
    allowedPins,
    pwmPins,
    monitoredPins,
    setMonitoredPins,
    setPinMode,
    isConnected,
  } = useGpioUI();
  const [selectedPin, setSelectedPin] = useState(allowedPins[0]);
  const [selectedMode, setSelectedMode] = useState<PinMode>("input");
  const supportsPwm = pwmPins.includes(selectedPin);

  useEffect(() => {
    if (!supportsPwm && selectedMode === "pwm") setSelectedMode("input");
  }, [selectedMode, supportsPwm]);

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
              <div key={pin}>
                <span> {pin} </span>
                <Input
                  checked={monitoredPins.get(pin) ?? false}
                  type="checkbox"
                  onChange={(e) => updateMonitoredPins(e, pin)}
                />
              </div>
            );
          })}
        </div>
      </Subsection>

      <Subsection subtitle="Select pin mode">
        <p className="mb-4 text-sm text-slate-500">
          PWM is available only on GPIO 18.
        </p>
        <fieldset
          className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-end"
          disabled={!isConnected}
        >
          <label className="flex min-w-0 flex-col gap-1 text-sm text-slate-400" htmlFor="mode-pin">
            Pin
            <select
              className="min-w-0 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 font-mono text-slate-100 outline-none focus:border-cyan-400"
              id="mode-pin"
              onChange={(event) => setSelectedPin(Number(event.target.value))}
              value={selectedPin}
            >
              {allowedPins.map((pin) => (
                <option key={pin} value={pin}>
                  GPIO {pin}
                </option>
              ))}
            </select>
          </label>

          <label className="flex min-w-0 flex-col gap-1 text-sm text-slate-400" htmlFor="pin-mode">
            Mode
            <select
              className="min-w-0 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 font-mono text-slate-100 outline-none focus:border-cyan-400"
              id="pin-mode"
              onChange={(event) => setSelectedMode(event.target.value as PinMode)}
              value={selectedMode}
            >
              <option value="input">Input</option>
              <option value="output">Output</option>
              {supportsPwm && <option value="pwm">PWM</option>}
            </select>
          </label>

          <label className="flex items-center gap-2 self-end pb-2 text-sm text-slate-400" htmlFor="selected-pin-monitor">
            <Input
              checked={monitoredPins.get(selectedPin) ?? false}
              id="selected-pin-monitor"
              onChange={(event) => updateMonitoredPins(event, selectedPin)}
              type="checkbox"
            />
            Monitor pin
          </label>

          <Button
            onClick={() => setPinMode(selectedPin, selectedMode)}
            type="button"
          >
            Apply mode
          </Button>
        </fieldset>
      </Subsection>

      <Subsection subtitle="Pins settings">
        <div className="grid grid-col-1 gap-4">
          {allowedPins.map((pin) => {
            return <GpioActions key={pin} pin={pin} />;
          })}
        </div>
      </Subsection>
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

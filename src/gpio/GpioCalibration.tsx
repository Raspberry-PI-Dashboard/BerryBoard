import { useState } from "react";
import { Section } from "../layouts/Section";
import { Button, Input } from "../layouts/StyledComponents";
import { useGpioUI } from "./useGpioUI";

export function GpioCalibration() {
  const {
    isConnected,
    pwmPins,
    pwmValues,
    selectedPwmPin,
    setPinPWM,
    stopPinPWM,
  } = useGpioUI();
  const currentPwm = pwmValues.get(selectedPwmPin);
  const [dutyCycle, setDutyCycle] = useState(currentPwm?.duty_cycle ?? 0);
  const [frequency, setFrequency] = useState(currentPwm?.frequency ?? 1000);

  return (
    <Section className="h-full" Title="PWM Calibration">
      <fieldset className="flex flex-col gap-4" disabled={!isConnected}>
        <div className="text-sm text-slate-400">
          GPIO {selectedPwmPin} is the available PWM pin.
        </div>
        <Input
          label="Duty cycle (%)"
          max={100}
          min={0}
          onChange={(event) =>
            setDutyCycle(Math.min(100, Math.max(0, Number(event.target.value))))
          }
          type="number"
          value={dutyCycle}
        />
        <Input
          label="Frequency (Hz)"
          min={1}
          onChange={(event) => setFrequency(Math.max(1, Number(event.target.value) || 1))}
          type="number"
          value={frequency}
        />
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => setPinPWM(selectedPwmPin, dutyCycle, frequency)}
            type="button"
          >
            Apply PWM
          </Button>
          <Button onClick={() => stopPinPWM(selectedPwmPin)} type="button">
            Stop PWM
          </Button>
        </div>
        <div className="text-sm text-slate-500">
          {currentPwm?.active
            ? `${currentPwm.duty_cycle}%${currentPwm.frequency ? ` at ${currentPwm.frequency}Hz` : ""}`
            : "PWM stopped"}
        </div>
      </fieldset>
      {pwmPins.length === 0 && (
        <p className="text-sm text-slate-500">No PWM-capable pins available.</p>
      )}
    </Section>
  );
}
import { useGpioContext } from "../context/GpioContext";

export function useGpioUI() {
  const { pinValues, ...gpio } = useGpioContext();

  // UI
  function getPinStatus(pin: number): string {
    if (!gpio.monitoredPins.get(pin)) return "Not monitored";

    if (gpio.pinModes.get(pin) === "pwm") {
      const pwm = gpio.pwmValues.get(pin);
      return pwm ? `${pwm.duty_cycle}%` : "PWM unavailable";
    }

    const response = pinValues.get(pin);
    return response ? (response.value ? "High" : "Low") : "No reading";
  }

  function getPinLabel(pin: number): string {
    return "GPIO " + pin;
  }

  function getPinMode(pin: number): string {
    const mode = gpio.pinModes.get(pin);
    return mode ? mode[0].toUpperCase() + mode.slice(1) : "Unknown";
  }

  // Return the original gpio object along with the UI functions
  return {
    ...gpio,
    getPinLabel,
    getPinStatus,
    getPinMode,
  };
}

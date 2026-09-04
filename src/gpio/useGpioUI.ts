import { useGpioContext } from "../context/GpioContext";

export function useGpioUI() {
  const { pinValues, ...gpio } = useGpioContext();

  // UI
  function getPinStatus(pin: number): string {
    if (!gpio.monitoredPins.get(pin)) return "Not monitored";

    const response = pinValues.get(pin);
    return response ? (response.value ? "High" : "Low") : "No reading";
  }

  function getPinLabel(pin: number): string {
    return "GPIO " + pin;
  }

  function getPinMode(pin: number): string {
    return pin + " Mode: To be implemented";

    // const response = pinValues.get(pin);
    // return response ? response.mode : "Unknown";
  }

  // Return the original gpio object along with the UI functions
  return {
    ...gpio,
    getPinLabel,
    getPinStatus,
    getPinMode,
  };
}

import { useGpio } from "../hooks/useGpio";

export function useGpioUI() {
  const { pinValues, ...gpio } = useGpio();

  // UI
  function getPinStatus(pin: number) {
    const response = pinValues.get(pin);
    return response ? (response.value ? "High" : "Low") : "No reading";
  }

  function getPinLabel(pin: number) {
    return "GPIO " + pin;
  }

  // Return the original gpio object along with the UI functions
  return {
    ...gpio,
    getPinLabel,
    getPinStatus,
  };
}

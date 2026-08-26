import { createContext, useContext } from "react";
import type { useGpio } from "../hooks/useGpio";

export const GpioContext = createContext<ReturnType<typeof useGpio> | null>(
  null,
);

export function useGpioContext() {
  const gpio = useContext(GpioContext);
  if (!gpio) {
    throw new Error("useGpioContext must be used inside GpioProvider");
  }

  return gpio;
}

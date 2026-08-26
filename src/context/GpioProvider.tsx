import type { ReactNode } from "react";
import { GpioContext } from "./GpioContext";
import { useGpio } from "../hooks/useGpio";

type GpioProviderProps = {
  children: ReactNode;
};

export function GpioProvider({ children }: GpioProviderProps) {
  const gpio = useGpio();

  return <GpioContext.Provider value={gpio}>{children}</GpioContext.Provider>;
}

import { DashboardSettings } from "./DashboardSettings";
import { GpioConfiguration } from "../gpio/GpioConfiguration";

export function Configuration() {
  return (
    <>
      <DashboardSettings />
      <GpioConfiguration />
    </>
  );
}

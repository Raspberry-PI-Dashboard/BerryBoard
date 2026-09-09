import { GpioConfiguration } from "../gpio/GpioConfiguration";
import { GpioSettings } from "../gpio/GpioSettings";

export function GpioPage() {
  return (
    <>
      <GpioConfiguration />
      <GpioSettings />
    </>
  );
}

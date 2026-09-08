import { GpioMonitor } from "../gpio/GpioMonitor";
import { GpioWidget } from "../gpio/GpioWidget";
import { GpioCalibration } from "../gpio/GpioCalibration";
import { ShellWidget } from "./ShellWidget";
import { useWidgetVisibility } from "../hooks/useWidgetVisibility";
import { I2CWidget } from "../i2c/I2CWidget";
import { useWebSocketContext } from "../context/WebSocketContext";

const defaultWidgetOrder = ["pinout", "gpio", "calibration", "i2c", "shell"] as const;
type WidgetId = (typeof defaultWidgetOrder)[number];

const widgets: Record<WidgetId, React.ReactNode> = {
  pinout: <GpioMonitor />,
  gpio: <GpioWidget />,
  calibration: <GpioCalibration />,
  i2c: <I2CWidget />,
  shell: <ShellWidget />,
};

const widgetLabels: Record<WidgetId, string> = {
  pinout: "GPIO pinout",
  gpio: "GPIO monitoring",
  calibration: "PWM calibration",
  i2c: "I2C bus",
  shell: "Remote shell",
};

export function Dashboard() {
  const { isConnected } = useWebSocketContext();
  const { isWidgetVisible } = useWidgetVisibility();

  return (
    <div className="grid items-stretch gap-6 lg:grid-cols-2">
      {defaultWidgetOrder.filter(isWidgetVisible).map((widget) => (
        <div
          className="relative flex h-full lg:sticky lg:top-6"
          key={widget}
        >
          <fieldset
            aria-label={`${widgetLabels[widget]} controls`}
            className="contents"
            disabled={!isConnected}
          >
            {widgets[widget]}
          </fieldset>
        </div>
      ))}
    </div>
  );
}
import { useState } from "react";
import { GpioMonitor } from "../gpio/GpioMonitor";
import { ShellWebSocket } from "./ShellWebSocket";
import { useWidgetLayout } from "../hooks/useWidgetLayout";

const defaultWidgetOrder = ["gpio", "shell"] as const;
type WidgetId = (typeof defaultWidgetOrder)[number];

const widgets: Record<WidgetId, React.ReactNode> = {
  gpio: <GpioMonitor />,
  shell: <ShellWebSocket />,
};

const widgetLabels: Record<WidgetId, string> = {
  gpio: "GPIO monitoring",
  shell: "Remote shell",
};

export function Dashboard() {
  const { widgetOrder, moveWidget } = useWidgetLayout(
    "dashboard-widget-order",
    defaultWidgetOrder,
  );
  const [draggedWidget, setDraggedWidget] = useState<WidgetId | null>(null);

  return (
    <div className="grid items-start gap-6 lg:grid-cols-2">
      {widgetOrder.map((widget) => (
        <div
          className="relative cursor-grab active:cursor-grabbing lg:sticky lg:top-6"
          draggable
          key={widget}
          onDragEnd={() => setDraggedWidget(null)}
          onDragOver={(event) => event.preventDefault()}
          onDragStart={() => setDraggedWidget(widget)}
          onDrop={() => {
            if (draggedWidget) moveWidget(draggedWidget, widget);
            setDraggedWidget(null);
          }}
          title={`Move ${widgetLabels[widget]} widget`}
        >
          {widgets[widget]}
        </div>
      ))}
    </div>
  );
}
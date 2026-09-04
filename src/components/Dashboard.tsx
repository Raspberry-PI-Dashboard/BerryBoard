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
          className="relative lg:sticky lg:top-6"
          key={widget}
          onDragOver={(event) => event.preventDefault()}
          onDrop={() => {
            if (draggedWidget) moveWidget(draggedWidget, widget);
            setDraggedWidget(null);
          }}
        >
          <button
            aria-label={`Move ${widgetLabels[widget]} widget`}
            className="absolute right-3 top-3 z-10 cursor-grab rounded border border-slate-700 bg-slate-950 px-2 py-1 text-sm leading-none text-slate-500 hover:text-slate-100 active:cursor-grabbing"
            draggable
            onDragEnd={() => setDraggedWidget(null)}
            onDragStart={() => setDraggedWidget(widget)}
            title={`Move ${widgetLabels[widget]} widget`}
            type="button"
          >
            ⋮⋮
          </button>
          {widgets[widget]}
        </div>
      ))}
    </div>
  );
}
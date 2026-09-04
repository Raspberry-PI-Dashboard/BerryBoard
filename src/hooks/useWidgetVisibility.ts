import { useCookie } from "./useCookie";

export const dashboardWidgets = [
  { id: "gpio", label: "GPIO monitoring" },
  { id: "shell", label: "Remote shell" },
] as const;

export type WidgetId = (typeof dashboardWidgets)[number]["id"];

const defaultVisibility: Record<WidgetId, boolean> = {
  gpio: true,
  shell: true,
};

export function useWidgetVisibility() {
  const [visibility, setVisibility] = useCookie(
    "dashboard-widget-visibility",
    defaultVisibility,
  );
  function setWidgetVisible(widget: WidgetId, visible: boolean) {
    setVisibility((current) => ({ ...current, [widget]: visible }));
  }

  function isWidgetVisible(widget: WidgetId) {
    return visibility[widget] !== false;
  }

  return { isWidgetVisible, setWidgetVisible };
}
import { useCookie } from "./useCookie";

function deserializeWidgetOrder<T extends string>(
  value: string,
  defaultOrder: readonly T[],
) {
  const parsed = JSON.parse(value) as unknown;
  if (!Array.isArray(parsed)) throw new Error("Invalid widget order");

  const validWidgets = parsed.filter(
    (widget): widget is T =>
      typeof widget === "string" && defaultOrder.includes(widget as T),
  );

  return [
    ...new Set(validWidgets),
    ...defaultOrder.filter((widget) => !validWidgets.includes(widget)),
  ];
}

export function useWidgetLayout<T extends string>(
  cookieName: string,
  defaultOrder: readonly T[],
) {
  const [widgetOrder, setWidgetOrder] = useCookie<T[]>(
    cookieName,
    [...defaultOrder],
    {
      deserialize: (value) => deserializeWidgetOrder(value, defaultOrder),
    },
  );

  function moveWidget(widget: T, target: T) {
    if (widget === target) return;

    setWidgetOrder((currentOrder) => {
      const nextOrder = currentOrder.filter((item) => item !== widget);
      const targetIndex = nextOrder.indexOf(target);
      nextOrder.splice(targetIndex, 0, widget);
      return nextOrder;
    });
  }

  return { widgetOrder, moveWidget };
}
import { useState } from "react";
import clsx from "clsx";
import { WebSocketStatusMini } from "./WebSocketStatus";

export function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <aside
      className={clsx(
        "fixed inset-y-0 left-0 z-20",
        "flex flex-col",
        "transition-all duration-300 md:relative",
        sidebarOpen ? "w-64" : "w-20",
        "h-full",
        "border border-slate-800",
        "bg-slate-950",
      )}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        
        setSidebarOpen((open) => !open);
      }}
    >
      <div
        className={clsx(
          "flex",
          "h-16 shrink-0 items-center",
          "border-b border-gray-800",
          "px-5",
          "cursor-pointer",
        )}
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500 font-bold">
          ◉
        </div>

        <span
          className={clsx(
            "ml-3",
            "overflow-hidden",
            "whitespace-nowrap font-semibold",
            "transition-all duration-300",
            sidebarOpen ? "w-auto opacity-100" : "w-0 opacity-0",
          )}
        >
          Board Settings
        </span>
      </div>

      <div onClick={(e) => e.stopPropagation()}>
        <WebSocketStatusMini isOpen={sidebarOpen} />
      </div>
    </aside>
  );
}

import { useState } from "react";
import clsx from "clsx";
import { WebSocketStatusMini } from "./WebSocketStatus";

export type Page = "monitor" | "settings";

type SidebarProps = {
  activePage: Page;
  onNavigate: (page: Page) => void;
};

export function Sidebar({ activePage, onNavigate }: SidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <aside
      className={clsx(
        "fixed inset-y-0 left-0 z-20",
        "flex flex-col",
        "transition-all duration-300 md:relative",
        sidebarOpen ? "w-64" : "w-16",
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
          "flex gap-3",
          "h-16 shrink-0 items-center",
          "border-b border-gray-800",
          "cursor-pointer",
        )}
      >
        <div className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500 font-bold">
          ◉
        </div>

        <span
          className={clsx(
            "overflow-hidden",
            "whitespace-nowrap font-semibold",
            "transition-all duration-300",
            sidebarOpen ? "w-auto opacity-100" : "w-0 opacity-0",
          )}
        >
          DeviceScript
        </span>
      </div>

      <nav className="flex flex-col gap-1 p-2" aria-label="Primary navigation">
        {(
          [
            ["monitor", "Monitor", "◈"],
            ["settings", "Settings", "⚙"],
          ] as const
        ).map(([page, label, icon]) => (
          <button
            className={clsx(
              "flex items-center rounded-lg px-3 py-2 text-left transition-colors",
              activePage === page
                ? "bg-slate-800 text-cyan-300"
                : "text-slate-400 hover:bg-slate-900 hover:text-slate-100",
            )}
            key={page}
            onClick={(event) => {
              event.stopPropagation();
              onNavigate(page);
            }}
            type="button"
            title={sidebarOpen ? undefined : label}
          >
            <span
              aria-hidden="true"
              className="w-5 text-center text-lg leading-none"
            >
              {icon}
            </span>
            <span className={clsx("ml-2", !sidebarOpen && "sr-only")}>
              {label}
            </span>
          </button>
        ))}
      </nav>

      <div onClick={(e) => e.stopPropagation()}>
        <WebSocketStatusMini isOpen={sidebarOpen} />
      </div>
    </aside>
  );
}

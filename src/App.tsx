import { ShellWebSocket } from "./components/ShellWebSocket";
import { WebSocketStatus } from "./components/WebSocketStatus";
import { GpioMonitor } from "./components/GpioMonitor";
import { GpioSettings } from "./components/GpioSettings";
import { WebSocketProvider } from "./context/WebSocketProvider";
import { GpioProvider } from "./context/GpioProvider";
import { Sidebar } from "./components/Sidebar";
import type { Page } from "./components/Sidebar";
import { useState } from "react";

const defaultUrl = import.meta.env.VITE_WEBSOCKET_URL ?? "ws://localhost:8080";
function App() {
  const [activePage, setActivePage] = useState<Page>("monitor");

  return (
    <WebSocketProvider initialUrl={defaultUrl}>
      <GpioProvider>
        <AppContent activePage={activePage} onNavigate={setActivePage} />
      </GpioProvider>
    </WebSocketProvider>
  );
}

function AppContent({
  activePage,
  onNavigate,
}: {
  activePage: Page;
  onNavigate: (page: Page) => void;
}) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <header>
        <Sidebar activePage={activePage} onNavigate={onNavigate} />
      </header>
      <main className="min-h-screen flex flex-col gap-6 px-6 py-12">
        {activePage === "settings" ? (
          <>
            <WebSocketStatus />
            <GpioSettings />
          </>
        ) : (
          <>
            <GpioMonitor />
            <ShellWebSocket />
          </>
        )}
      </main>
    </div>
  );
}

export default App;

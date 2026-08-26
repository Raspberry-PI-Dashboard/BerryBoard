import { ShellWebSocket } from "./components/ShellWebSocket";
import { WebSocketStatus } from "./components/WebSocketStatus";
import { GpioStatus } from "./components/GpioStatus";
import { WebSocketProvider } from "./context/WebSocketProvider";
import { Sidebar } from "./components/Sidebar";

const defaultUrl = import.meta.env.VITE_WEBSOCKET_URL ?? "ws://localhost:8080";

function App() {
  return (
    <WebSocketProvider initialUrl={defaultUrl}>
      <div className="flex min-h-screen bg-slate-950 text-slate-100">
        <header>
          <Sidebar />
        </header>
        <main className="min-h-screen flex flex-col gap-6 px-6 py-12">
          <WebSocketStatus />
          <GpioStatus />
          <ShellWebSocket />
        </main>
      </div>
    </WebSocketProvider>
  );
}

export default App;

import { ShellWebSocket } from "./components/ShellWebSocket";
import { WebSocketStatus } from "./components/WebSocketStatus";
import { GpioStatus } from "./components/GpioStatus";
import { WebSocketProvider } from "./context/WebSocketProvider";

const defaultUrl = import.meta.env.VITE_WEBSOCKET_URL ?? "ws://localhost:8080";

function App() {
  return (
    <WebSocketProvider initialUrl={defaultUrl}>
      <main className="min-h-screen flex flex-col gap-6 bg-slate-950 px-6 py-12 text-slate-100">
        <WebSocketStatus />
        <ShellWebSocket />
        <GpioStatus />
      </main>
    </WebSocketProvider>
  );
}

export default App;

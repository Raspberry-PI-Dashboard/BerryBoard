import { ShellWebSocket } from "./components/ShellWebSocket";
import { WebSocketStatus } from "./components/WebSocketStatus";
import { WebSocketProvider } from "./context/WebSocketProvider";
import { Section } from "./layouts/Section";

const defaultUrl = import.meta.env.VITE_WEBSOCKET_URL ?? "ws://localhost:8080";

function App() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100">
      <WebSocketProvider initialUrl={defaultUrl}>
        <Section>
          <WebSocketStatus />
        </Section>
        <Section className="mt-6">
          <ShellWebSocket />
        </Section>
      </WebSocketProvider>
    </main>
  );
}

export default App;

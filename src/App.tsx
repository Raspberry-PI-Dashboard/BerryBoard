import { WebSocketStatus } from './components/WebSocketStatus'

const defaultUrl = import.meta.env.VITE_WEBSOCKET_URL ?? 'ws://localhost:8080'

function App() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100">
      <section className="mx-auto w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <WebSocketStatus initialUrl={defaultUrl} />
      </section>
    </main>
  )
}

export default App

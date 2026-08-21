import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'

const defaultUrl = import.meta.env.VITE_WEBSOCKET_URL ?? 'ws://localhost:8080'

function App() {
  const socketRef = useRef<WebSocket | null>(null)
  const [url, setUrl] = useState(defaultUrl)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<string[]>([])
  const [status, setStatus] = useState('Connecting')

  useEffect(() => {
    const socket = new WebSocket(url)
    socketRef.current = socket
    socket.onopen = () => setStatus('Connected')
    socket.onmessage = (event) => {
      setMessages((current) => [...current, String(event.data)])
    }
    socket.onerror = () => setStatus('Error')
    socket.onclose = () => setStatus('Disconnected')

    return () => socket.close()
  }, [url])

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!message || socketRef.current?.readyState !== WebSocket.OPEN) return

    socketRef.current.send(message)
    setMessages((current) => [...current, `You: ${message}`])
    setMessage('')
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100">
      <section className="mx-auto w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
              WebSocket client
            </p>
            <h1 className="text-3xl font-bold tracking-tight">Connection</h1>
          </div>
          <span className="rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-300">
            {status}
          </span>
        </div>

        <label className="block text-sm text-slate-400" htmlFor="url">
          WebSocket URL
        </label>
        <input
          className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-cyan-400"
          id="url"
          onChange={(event) => {
            setStatus('Connecting')
            setUrl(event.target.value)
          }}
          value={url}
        />

        <div className="mt-6 min-h-40 rounded-lg border border-slate-800 bg-slate-950 p-4 font-mono text-sm text-slate-300">
          {messages.length === 0 ? 'No messages received.' : messages.map((item, index) => <p key={`${item}-${index}`}>{item}</p>)}
        </div>

        <form className="mt-4 flex gap-3" onSubmit={sendMessage}>
          <input
            className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-cyan-400"
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Send a message"
            value={message}
          />
          <button className="rounded-lg bg-cyan-400 px-5 py-2 font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-40" disabled={status !== 'Connected'} type="submit">
            Send
          </button>
        </form>
      </section>
    </main>
  )
}

export default App

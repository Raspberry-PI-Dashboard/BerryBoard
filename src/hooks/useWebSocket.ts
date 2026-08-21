import { useEffect, useRef, useState } from 'react'

type ConnectionStatus = 'Connecting' | 'Connected' | 'Disconnected' | 'Error'

type UseWebSocketResult = {
  url: string
  setUrl: (url: string) => void
  status: ConnectionStatus
  error: string
  messages: string[]
}

export function getWebSocketUrlError(url: string) {
  try {
    const protocol = new URL(url).protocol
    return protocol === 'ws:' || protocol === 'wss:' ? '' : 'URL must use ws:// or wss://'
  } catch {
    return 'Enter a valid WebSocket URL'
  }
}

export function useWebSocket(initialUrl: string): UseWebSocketResult {
  const socketRef = useRef<WebSocket | null>(null)
  const [url, setUrlState] = useState(initialUrl)
  const [messages, setMessages] = useState<string[]>([])
  const [status, setStatus] = useState<ConnectionStatus>(
    getWebSocketUrlError(initialUrl) ? 'Error' : 'Connecting',
  )
  const [error, setError] = useState(() => getWebSocketUrlError(initialUrl))
  const urlError = getWebSocketUrlError(url)

  useEffect(() => {
    if (urlError) return

    const socket = new WebSocket(url)
    socketRef.current = socket

    socket.onopen = () => {
      setStatus('Connected')
      setError('')
    }
    socket.onmessage = (event) => {
      setMessages((current) => [...current, String(event.data)])
    }
    socket.onerror = () => {
      setStatus('Error')
      setError(`WebSocket error while connecting to ${url}`)
    }
    socket.onclose = (event) => {
      setStatus('Disconnected')
      if (event.code !== 1000) {
        setError(`Connection closed (${event.code})${event.reason ? `: ${event.reason}` : ''}`)
      }
    }

    return () => {
      socket.close()
      socketRef.current = null
    }
  }, [url, urlError])

  function setUrl(nextUrl: string) {
    const nextError = getWebSocketUrlError(nextUrl)
    setStatus(nextError ? 'Error' : 'Connecting')
    setError(nextError)
    setUrlState(nextUrl)
  }

  return {
    url,
    setUrl,
    status,
    error: urlError || error,
    messages,
  }
}

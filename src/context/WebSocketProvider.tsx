import type { ReactNode } from 'react'
import { WebSocketContext } from './WebSocketContext'
import { useWebSocket } from '../hooks/useWebSocket'
import { useCookie } from '../hooks/useCookie'

type WebSocketProviderProps = {
  initialUrl: string
  children: ReactNode
}

export const urlCookieName = 'websocket-url'

export function WebSocketProvider({ initialUrl, children }: WebSocketProviderProps) {
  const [savedUrl] = useCookie(urlCookieName, initialUrl, {
    serialize: (value) => value,
    deserialize: (value) => value,
  })
  const connection = useWebSocket(savedUrl)

  return <WebSocketContext.Provider value={connection}>{children}</WebSocketContext.Provider>
}

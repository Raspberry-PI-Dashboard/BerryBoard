import type { ReactNode } from 'react'
import { WebSocketContext } from './WebSocketContext'
import { useWebSocket } from '../hooks/useWebSocket'

type WebSocketProviderProps = {
  initialUrl: string
  children: ReactNode
}

export const urlCookieName = 'websocket-url'

function getSavedUrl(fallback: string) {
  const savedCookie = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith(`${urlCookieName}=`))

  return savedCookie ? decodeURIComponent(savedCookie.split('=')[1]) : fallback
}

export function WebSocketProvider({ initialUrl, children }: WebSocketProviderProps) {
  const connection = useWebSocket(getSavedUrl(initialUrl))

  return <WebSocketContext.Provider value={connection}>{children}</WebSocketContext.Provider>
}

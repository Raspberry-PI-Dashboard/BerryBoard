import { createContext, useContext } from 'react'
import type { UseWebSocketResult } from '../hooks/useWebSocket'

export const WebSocketContext = createContext<UseWebSocketResult | null>(null)

export function useWebSocketContext() {
  const connection = useContext(WebSocketContext)
  if (!connection) throw new Error('useWebSocketContext must be used inside WebSocketProvider')
  return connection
}

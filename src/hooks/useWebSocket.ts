import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ShellMessage } from "../ws/message";
import type {
  StartupRequest,
  WebSocketMessage,
  WebSocketRequest,
} from "../ws/protocol";

type ConnectionStatus = "Connecting" | "Connected" | "Disconnected" | "Error";

export type UseWebSocketResult = {
  url: string;
  setUrl: (url: string) => void;
  status: ConnectionStatus;
  error: string;
  messages: WebSocketMessage[];
  sendMessage: (message: WebSocketRequest | ShellMessage) => boolean;
};

export function getWebSocketUrlError(url: string) {
  try {
    const protocol = new URL(url).protocol;
    return protocol === "ws:" || protocol === "wss:"
      ? ""
      : "URL must use ws:// or wss://";
  } catch {
    return "Enter a valid WebSocket URL";
  }
}

export function useWebSocket(initialUrl: string): UseWebSocketResult {
  const socketRef = useRef<WebSocket | null>(null);
  const [url, setUrlState] = useState(initialUrl);
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);
  const [status, setStatus] = useState<ConnectionStatus>(
    getWebSocketUrlError(initialUrl) ? "Error" : "Connecting",
  );
  const [error, setError] = useState(() => getWebSocketUrlError(initialUrl));
  const urlError = getWebSocketUrlError(url);

  useEffect(() => {
    if (urlError) return;

    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.onopen = () => {
      if (socketRef.current !== socket) return;
      setStatus("Connected");
      setError("");

      const startupRequest: StartupRequest = { type: "startup" };
      socket.send(JSON.stringify(startupRequest));
    };
    socket.onmessage = (event) => {
      if (socketRef.current !== socket) return;
      try {
        const message: WebSocketMessage = JSON.parse(String(event.data));
        setMessages((current) => [...current, message]);
      } catch {
        setStatus("Error");
        setError("Received an invalid WebSocket message");
      }
    };
    socket.onerror = () => {
      if (socketRef.current !== socket) return;
      setStatus("Error");
      setError(`WebSocket error while connecting to ${url}`);
    };
    socket.onclose = (event) => {
      if (socketRef.current !== socket) return;
      setStatus("Disconnected");
      if (event.code !== 1000) {
        setError(
          `Connection closed (${event.code})${event.reason ? `: ${event.reason}` : ""}`,
        );
      }
    };

    return () => {
      socketRef.current = null;
      socket.close();
    };
  }, [url, urlError]);

  const setUrl = useCallback((nextUrl: string) => {
    const nextError = getWebSocketUrlError(nextUrl);
    setStatus(nextError ? "Error" : "Connecting");
    setError(nextError);
    setUrlState(nextUrl);
  }, []);

  const sendMessage = useCallback((message: WebSocketRequest | ShellMessage) => {
    if (socketRef.current?.readyState !== WebSocket.OPEN) return false;

    socketRef.current.send(JSON.stringify(message));
    return true;
  }, []);

  return useMemo(() => ({
    url,
    setUrl,
    status,
    error: urlError || error,
    messages,
    sendMessage,
  }), [error, messages, sendMessage, setUrl, status, url, urlError]);
}

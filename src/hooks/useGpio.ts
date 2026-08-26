import type { PinReadResponse, WebSocketMessage } from "../ws/protocol";
import { useWebSocketContext } from "../context/WebSocketContext";

function isPinReadResponse(
  message: WebSocketMessage,
): message is PinReadResponse {
  return (
    "type" in message && message.type === "pin" && message.action === "read"
  );
}

export function useGpio() {
  const { messages, status, sendMessage } = useWebSocketContext();
  const isConnected = status === "Connected";

  const allowedPins = [17, 18, 22, 23, 24, 25];
  const pinValues = new Map<number, PinReadResponse>();

  for (const message of messages) {
    if (isPinReadResponse(message)) pinValues.set(message.pin, message);
  }

  function readPin(pin: number) {
    sendMessage({ type: "pin", action: "read", pin });
  }

  function updatePinout() {
    allowedPins.forEach(readPin);
  }

  function getPinLabel(pin: number) {
    const response = pinValues.get(pin);
    return response ? (response.value ? "High" : "Low") : "No reading";
  }

  return {
    isConnected,
    allowedPins,
    readPin,
    updatePinout,
    getPinLabel,
  };
}

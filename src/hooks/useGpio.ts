import { useEffect, useState } from "react";
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
  const [refreshInterval, setRefreshInterval] = useState(5);
  const [monitoredPins, setMonitoredPins] = useState(
    new Map<number, boolean>(),
  );

  const allowedPins = [17, 18, 22, 23, 24, 25];
  const pinValues = new Map<number, PinReadResponse>();

  for (const message of messages) {
    if (isPinReadResponse(message)) pinValues.set(message.pin, message);
  }

  function readPin(pin: number) {
    sendMessage({ type: "pin", action: "read", pin });
  }

  function updateMonitoredPins() {
    const availablePins: number[] = [];
    monitoredPins.forEach((value, pin) => {
      if (value) {
        availablePins.push(pin);
      }
    });
    availablePins.forEach(readPin);
  }

  // POLLING
  useEffect(() => {
    if (!isConnected) return;

    const intervalId = window.setInterval(
      updateMonitoredPins,
      refreshInterval * 1000,
    );
    return () => window.clearInterval(intervalId);
  }, [isConnected, refreshInterval, sendMessage]);

  // UI
  function getPinStatus(pin: number) {
    const response = pinValues.get(pin);
    return response ? (response.value ? "High" : "Low") : "No reading";
  }

  function getPinLabel(pin: number) {
    return "GPIO " + pin;
  }

  return {
    isConnected,
    allowedPins,
    monitoredPins,
    setMonitoredPins,
    readPin,
    getPinLabel,
    getPinStatus,
    refreshInterval,
    setRefreshInterval,
  };
}

import { useEffect, useState } from "react";
import type {
  PinMode,
  PinModeResponse,
  PinPwmResponse,
  PinReadResponse,
  WebSocketMessage,
} from "../ws/protocol";
import { useWebSocketContext } from "../context/WebSocketContext";
import { useCookie } from "./useCookie";

function isPinReadResponse(
  message: WebSocketMessage,
): message is PinReadResponse {
  return (
    "type" in message && message.type === "pin" && message.action === "read"
  );
}

function isPinModeResponse(
  message: WebSocketMessage,
): message is PinModeResponse {
  return (
    "type" in message && message.type === "pin" && message.action === "mode"
  );
}

function isPinPwmResponse(
  message: WebSocketMessage,
): message is PinPwmResponse {
  return (
    "type" in message &&
    message.type === "pin" &&
    (message.action === "pwm_set" || message.action === "pwm_stop")
  );
}

function useGpioPolling(readPin: (pin: number) => void, isConnected: boolean) {
  const [refreshInterval, setRefreshInterval] = useState(5);
  const [savedPins, setSavedPins] = useCookie<number[]>(
    "monitored-pins",
    [],
  );
  const monitoredPins = new Map<number, boolean>(
    savedPins.map((pin) => [pin, true]),
  );

  function setMonitoredPins(nextPins: Map<number, boolean>) {
    const pins = new Map(nextPins);
    setSavedPins(
      [...pins]
        .filter(([, monitored]) => monitored)
        .map(([pin]) => pin),
    );
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
  }, [isConnected, refreshInterval]);

  return {
    monitoredPins,
    setMonitoredPins,
    refreshInterval,
    setRefreshInterval,
  };
}

export function useGpio() {
  const { messages, status, sendMessage } = useWebSocketContext();

  // WS
  const isConnected = status === "Connected";

  function readPin(pin: number) {
    sendMessage({ type: "pin", action: "read", pin });
  }

  function setPin(pin: number, value: boolean) {
    sendMessage({ type: "pin", action: "set", pin, value });
  }

  function setPinMode(pin: number, mode: PinMode) {
    sendMessage({ type: "pin", action: "mode", pin, mode });
  }

  function setPinPWM(pin: number, duty_cycle: number, frequency?: number) {
    sendMessage({ type: "pin", action: "pwm_set", pin, duty_cycle, frequency });
  }

  function stopPinPWM(pin: number) {
    sendMessage({ type: "pin", action: "pwm_stop", pin });
  }

  function togglePin(pin: number) {
    sendMessage({ type: "pin", action: "toggle", pin });
  }
  //

  const {
    monitoredPins,
    setMonitoredPins,
    refreshInterval,
    setRefreshInterval,
  } = useGpioPolling(readPin, isConnected);

  const allowedPins = [17, 18, 22, 23, 24, 25];
  const pwmPins = [18];
  const pinValues = new Map<number, PinReadResponse>();
  const pinModes = new Map<number, PinMode>();
  const pwmValues = new Map<number, PinPwmResponse>();

  for (const message of messages) {
    if (isPinReadResponse(message)) {
      pinValues.set(message.pin, message);
    }
    if (isPinModeResponse(message)) pinModes.set(message.pin, message.mode);
    if (isPinPwmResponse(message)) pwmValues.set(message.pin, message);
  }

  return {
    isConnected,

    pinValues,
    pinModes,
    pwmValues,
    allowedPins,
    pwmPins,
    monitoredPins,
    setMonitoredPins,

    readPin,
    setPin,
    setPinMode,
    togglePin,
    setPinPWM,
    stopPinPWM,
    refreshInterval,
    setRefreshInterval,
  };
}

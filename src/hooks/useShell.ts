import { useState } from "react";
import type {
  ErrorMessage,
  ShellStartedMessage,
  ShellOutputMessage,
  WebSocketMessage,
} from "../ws/protocol";
import { useWebSocketContext } from "../context/WebSocketContext";

function isShellOutput(
  message: WebSocketMessage,
): message is ShellOutputMessage {
  return "type" in message && message.type === "shell_output";
}

function isErrorMessage(message: WebSocketMessage): message is ErrorMessage {
  return (
    ("type" in message && message.type === "error") ||
    ("ok" in message && message.ok === false)
  );
}

function isShellStarted(
  message: WebSocketMessage,
): message is ShellStartedMessage {
  return "type" in message && message.type === "shell_started";
}

export function useShell() {
  const { isConnected, messages, sendMessage } = useWebSocketContext();

  const shellMessages = messages.filter(isShellOutput);
  const shellErrors = messages.filter(isErrorMessage);
  const shellStarted = messages.some(isShellStarted);

  function startShell() {
    sendMessage({ type: "shell_start" });
  }

  function runCommand(command: string, callback: () => void) {
    const message = { type: "shell_input" as const, data: command };
    if (command && sendMessage(message)) callback();
  }

  return {
    isConnected,
    shellStarted,
    shellMessages,
    shellErrors,
    runCommand,
    startShell,
  };
}

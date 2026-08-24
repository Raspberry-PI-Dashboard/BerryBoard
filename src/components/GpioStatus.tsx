import { useEffect } from "react";
import type { PinReadResponse, WebSocketMessage } from "../ws/protocol";
import { useWebSocketContext } from "../context/WebSocketContext";
import { Section, SectionTitle } from "../layouts/Section";

const allowedPins = [17, 18, 22, 23, 24, 25];

function isPinReadResponse(
  message: WebSocketMessage,
): message is PinReadResponse {
  return (
    "type" in message &&
    message.type === "pin" &&
    message.action === "read"
  );
}

export function GpioStatus() {
  const { messages, status, sendMessage } = useWebSocketContext();

  const pinValues = new Map<number, PinReadResponse>();
  for (const message of messages) {
    if (isPinReadResponse(message)) pinValues.set(message.pin, message);
  }

  function readPin(pin: number) {
    sendMessage({ type: "pin", action: "read", pin });
  }

  useEffect(() => {
    if (status !== "Connected") return;
    for (const pin of allowedPins) {
      sendMessage({ type: "pin", action: "read", pin });
    }
  }, [sendMessage, status]);

  return (
    <Section>
      <div className="mb-6 flex items-center justify-between gap-4">
        <SectionTitle>GPIO inputs</SectionTitle>
        <button
          className="rounded-lg border border-cyan-400 px-4 py-2 text-sm font-semibold text-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"
          disabled={status !== "Connected"}
          onClick={() => allowedPins.forEach(readPin)}
          type="button"
        >
          Refresh
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {allowedPins.map((pin) => {
          const response = pinValues.get(pin);

          return (
            <div
              className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 p-4"
              key={pin}
            >
              <div>
                <div className="font-mono text-lg text-slate-100">GPIO {pin}</div>
                <div className="mt-1 text-sm text-slate-400">
                  {response ? (response.value ? "High" : "Low") : "No reading"}
                </div>
              </div>
              <button
                aria-label={`Read GPIO ${pin}`}
                className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 disabled:cursor-not-allowed disabled:opacity-40"
                disabled={status !== "Connected"}
                onClick={() => readPin(pin)}
                type="button"
              >
                Read
              </button>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

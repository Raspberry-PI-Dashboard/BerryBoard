import { useState } from "react";
import { getWebSocketUrlError } from "../hooks/useWebSocket";
import { useCookie } from "../hooks/useCookie";
import { useWebSocketContext } from "../context/WebSocketContext";
import { Section, SectionError, Subsection } from "../layouts/Section";
import { Badge, Button, Input } from "../layouts/StyledComponents";
import type { UpdateMessage } from "../ws/protocol";
import { AutoScrollPanel } from "./AutoScrollPanel";

export function WebSocketStatus() {
  const [saved, setSaved] = useState(false);
  const [, setSavedUrl] = useCookie("websocket-url", "", {
    serialize: (value) => value,
    deserialize: (value) => value,
  });
  const { url, setUrl, status, error, isConnected, messages, sendMessage } =
    useWebSocketContext();
  const updateMessages = messages.filter(
    (message): message is UpdateMessage =>
      "type" in message && message.type === "update",
  );
  const updateText = updateMessages
    .map((message) => JSON.stringify(message, null, 2))
    .join("\n");

  return (
    <Section
      Title="WebSocket Client"
      Accessory={
        <Badge
          variant={
            error || status === "Disconnected"
              ? "error"
              : isConnected
                ? "ok"
                : "warning"
          }
        >
          {status}
        </Badge>
      }
    >
      <div className="flex flex-col gap-6">
        <Subsection subtitle="Connection">
          <div className="flex items-end gap-3">
          <Input
            id="url"
            label="WebSocket URL"
            onChange={(event) => {
              setSaved(false);
              setUrl(event.target.value);
            }}
            value={url}
          />
          <Button
            disabled={Boolean(getWebSocketUrlError(url))}
            onClick={() => {
              setSavedUrl(url);
              setSaved(true);
            }}
            type="button"
          >
            {saved ? "URL saved" : "Save URL"}
          </Button>
          </div>

          {error && <SectionError className="mt-4">{error}</SectionError>}
        </Subsection>

        <div className="theme-divider" />

        <Subsection subtitle="Server update">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm text-slate-400">
                Deploy the configured branch and restart the gateway service.
              </p>
            </div>
            <Button
              onClick={() => sendMessage({ type: "update" })}
              type="button"
            >
              Update server
            </Button>
          </div>
          {updateMessages.length > 0 && (
            <AutoScrollPanel
              className="mt-4 max-h-48 p-3"
              contentKey={updateMessages.length}
              copyText={updateText}
            >
              {updateMessages.map((message, index) => (
                <pre className="whitespace-pre-wrap" key={index}>
                  {JSON.stringify(message, null, 2)}
                </pre>
              ))}
            </AutoScrollPanel>
          )}
        </Subsection>
      </div>
    </Section>
  );
}

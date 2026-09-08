import { useState } from "react";
import { getWebSocketUrlError } from "../hooks/useWebSocket";
import { useCookie } from "../hooks/useCookie";
import { useWebSocketContext } from "../context/WebSocketContext";
import { Section, SectionError } from "../layouts/Section";
import { Badge, Button, Input } from "../layouts/StyledComponents";
import clsx from "clsx";
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
        <Badge variant={error ? "error" : isConnected ? "ok" : "warning"}>
          {status}
        </Badge>
      }
    >
      <div className="flex gap-1 items-end">
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

      {error && <SectionError>{error}</SectionError>}

      <div className="mt-6 border-t border-slate-800 pt-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-slate-200">
              Server update
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Deploy the configured branch and restart the gateway service.
            </p>
          </div>
          <Button
            disabled={!isConnected}
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
      </div>
    </Section>
  );
}

export function WebSocketStatusMini({ isOpen }: { isOpen: boolean }) {
  const [saved, setSaved] = useState(false);
  const [, setSavedUrl] = useCookie("websocket-url", "", {
    serialize: (value) => value,
    deserialize: (value) => value,
  });
  const { url, setUrl, status, error, isConnected } = useWebSocketContext();

  return (
    <div
      className={clsx(
        "flex flex-col gap-2 items-start p-2",
        isOpen
          ? "w-0 opacity-0 sm:w-auto sm:opacity-100"
          : "w-0 opacity-0",
        "duration-300",
      )}
    >
      <div className="flex gap-1 items-end">
        <Input
          className="max-w-40"
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
          {saved ? "Saved" : "Save"}
        </Button>
      </div>

      <Badge variant={error ? "error" : isConnected ? "ok" : "warning"}>
        {status}
      </Badge>
    </div>
  );
}

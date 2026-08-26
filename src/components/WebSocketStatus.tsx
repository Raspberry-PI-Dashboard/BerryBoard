import { useState } from "react";
import { getWebSocketUrlError, saveUrl } from "../hooks/useWebSocket";
import { useWebSocketContext } from "../context/WebSocketContext";
import { Section, SectionError } from "../layouts/Section";
import { Badge, Button, Input } from "../layouts/StyledComponents";
import clsx from "clsx";

export function WebSocketStatus() {
  const [saved, setSaved] = useState(false);
  const { url, setUrl, status, error } = useWebSocketContext();

  return (
    <Section Title="WebSocket Client" Accessory={<Badge>{status}</Badge>}>
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
            saveUrl(url);
            setSaved(true);
          }}
          type="button"
        >
          {saved ? "URL saved" : "Save URL"}
        </Button>
      </div>

      {error && <SectionError>{error}</SectionError>}
    </Section>
  );
}

export function WebSocketStatusMini({ isOpen }: { isOpen: boolean }) {
  const [saved, setSaved] = useState(false);
  const { url, setUrl, status, error, isConnected } = useWebSocketContext();

  return (
    <div
      className={clsx(
        "flex flex-col gap-2 items-start p-2",
        isOpen ? "w-auto opacity-100" : "w-0 opacity-0",
      )}
    >
      <Badge variant={isConnected ? "ok" : "error"}>{status}</Badge>

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
            saveUrl(url);
            setSaved(true);
          }}
          type="button"
        >
          {saved ? "Saved" : "Save"}
        </Button>
      </div>

      {error && <SectionError>{error}</SectionError>}
    </div>
  );
}

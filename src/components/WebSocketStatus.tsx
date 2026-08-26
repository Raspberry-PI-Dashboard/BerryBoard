import { useState } from "react";
import { getWebSocketUrlError, saveUrl } from "../hooks/useWebSocket";
import { useWebSocketContext } from "../context/WebSocketContext";
import { Section, SectionError } from "../layouts/Section";
import { Badge, Button, Input } from "../layouts/StyledComponents";

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

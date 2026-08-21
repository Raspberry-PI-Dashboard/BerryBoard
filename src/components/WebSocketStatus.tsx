import { useState } from "react";
import { getWebSocketUrlError } from "../hooks/useWebSocket";
import { useWebSocketContext } from "../context/WebSocketContext";
import { SectionTitle } from "../layouts/Section";

const urlCookieName = "websocket-url";

export function WebSocketStatus() {
  const [saved, setSaved] = useState(false);
  const { url, setUrl, status, error } = useWebSocketContext();

  return (
    <>
      <div className="mb-8 flex items-center justify-between gap-4">
        <SectionTitle>WebSocket client</SectionTitle>
        <span className="rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-300">
          {status}
        </span>
      </div>

      <label className="block text-sm text-slate-400" htmlFor="url">
        WebSocket URL
      </label>
      <input
        className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-cyan-400"
        id="url"
        onChange={(event) => {
          setSaved(false);
          setUrl(event.target.value);
        }}
        value={url}
      />
      <button
        className="mt-3 rounded-lg border border-cyan-400 px-4 py-2 text-sm font-semibold text-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"
        disabled={Boolean(getWebSocketUrlError(url))}
        onClick={() => {
          document.cookie = `${urlCookieName}=${encodeURIComponent(url)}; max-age=31536000; path=/`;
          setSaved(true);
        }}
        type="button"
      >
        {saved ? "URL saved" : "Save URL"}
      </button>

      {error && (
        <div
          className="mt-3 rounded-lg border border-red-900 bg-red-950/50 px-3 py-2 text-sm text-red-300"
          role="alert"
        >
          {error}
        </div>
      )}
    </>
  );
}

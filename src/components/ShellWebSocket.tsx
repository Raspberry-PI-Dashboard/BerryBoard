import { useState } from "react";
import type { ShellMessage } from "../ws/message";
import type {
  ErrorMessage,
  ShellOutputMessage,
  WebSocketMessage,
} from "../ws/protocol";
import { useWebSocketContext } from "../context/WebSocketContext";
import { Section, SectionTitle } from "../layouts/Section";

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

export function ShellWebSocket() {
  const connection = useWebSocketContext();
  const [command, setCommand] = useState("");

  const { status, messages, sendMessage } = connection;
  const shellMessages = messages.filter(isShellOutput);
  const shellErrors = messages.filter(isErrorMessage);

  function runCommand() {
    const message: ShellMessage = { type: "shell", command };
    if (command && sendMessage(message)) setCommand("");
  }

  return (
    <Section>
      <SectionTitle>Remote shell</SectionTitle>

      <fieldset disabled={status !== "Connected"}>
        <form
          className="mt-8 flex gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            runCommand();
          }}
        >
          <input
            className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 font-mono text-slate-100 outline-none focus:border-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
            onChange={(event) => setCommand(event.target.value)}
            placeholder="Enter a shell command"
            value={command}
          />
          <button
            className="rounded-lg bg-cyan-400 px-5 py-2 font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={!command}
            type="submit"
          >
            Run
          </button>
        </form>
      </fieldset>

      <section
        className="mt-6 rounded-lg border border-red-900 bg-red-950/40 p-4"
        aria-live="polite"
      >
        <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-red-300">
          Shell errors
        </h2>
        <div className="mt-3 font-mono text-sm text-red-200">
          {shellErrors.length === 0
            ? "No shell errors."
            : shellErrors.map((error, index) => (
                <p
                  key={`${"message" in error ? error.message : error.error}-${index}`}
                  className="mb-2 last:mb-0"
                >
                  {"message" in error ? error.message : error.error}
                </p>
              ))}
        </div>
      </section>

      <div className="mt-6 overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden h-80 rounded-lg border border-slate-800 bg-slate-950 p-4 font-mono text-sm text-slate-300">
        {shellMessages.length === 0
          ? ""
          : shellMessages.map((message, index) => (
              <pre
                key={`${message.type}-${index}`}
                className="mb-3 whitespace-pre-wrap last:mb-0"
              >
                {message.data}
              </pre>
            ))}
      </div>
    </Section>
  );
}

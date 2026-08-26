import { useState } from "react";
import { Section, SectionTitle } from "../layouts/Section";
import { Button, Input } from "../layouts/StyledComponents";
import { useShell } from "../hooks/useShell";

export function ShellWebSocket() {
  const {
    shellErrors,
    shellMessages,
    shellStarted,
    isConnected,
    startShell,
    runCommand,
  } = useShell();
  const [command, setCommand] = useState("");

  return (
    <Section
      Title="Remote shell"
      Accessory={
        !shellStarted && (
          <Button onClick={startShell} type="button" disabled={!isConnected}>
            Start shell
          </Button>
        )
      }
    >
      <fieldset disabled={!isConnected}>
        <form
          className="mt-4 flex gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            runCommand(command, () => setCommand(""));
          }}
        >
          <Input
            onChange={(event) => setCommand(event.target.value)}
            placeholder="Enter a shell command"
            value={command}
          />
          <Button
            disabled={!command || !shellStarted}
            type="submit"
            variant="filled"
          >
            Run
          </Button>
        </form>
      </fieldset>

      {shellErrors.length > 0 && (
        <section
          className="mt-6 rounded-lg border border-red-900 bg-red-950/40 p-4"
          aria-live="polite"
        >
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-red-300">
            Shell errors
          </h2>
          <div className="mt-3 font-mono text-sm text-red-200">
            {shellErrors.map((error, index) => (
              <p
                key={`${"message" in error ? error.message : error.error}-${index}`}
                className="mb-2 last:mb-0"
              >
                {"message" in error ? error.message : error.error}
              </p>
            ))}
          </div>
        </section>
      )}

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

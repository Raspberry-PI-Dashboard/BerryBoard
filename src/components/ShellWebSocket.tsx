import { useState } from "react";
import { CardPanel, Section, SectionError } from "../layouts/Section";
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
      className="flex flex-col gap-2"
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
        <SectionError title="Shell Errors">
          {shellErrors.map((error, index) => (
            <p
              key={`${"message" in error ? error.message : error.error}-${index}`}
              className="mb-2 last:mb-0"
            >
              {"message" in error ? error.message : error.error}
            </p>
          ))}
        </SectionError>
      )}

      <CardPanel className="h-80">
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
      </CardPanel>
    </Section>
  );
}

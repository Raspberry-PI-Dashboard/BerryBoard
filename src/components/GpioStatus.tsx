import type { StartupResponse, WebSocketMessage } from "../ws/protocol";
import { useWebSocketContext } from "../context/WebSocketContext";
import { Section, SectionTitle } from "../layouts/Section";

function isStartupResponse(
  message: WebSocketMessage,
): message is StartupResponse {
  return message.type === "startup";
}

export function GpioStatus() {
  const { messages } = useWebSocketContext();
  const startup = messages.find(isStartupResponse);

  return (
    <Section>
      <SectionTitle>GPIO</SectionTitle>

      {!startup ? (
        <p className="text-sm text-slate-400">
          Waiting for the WebSocket startup response.
        </p>
      ) : (
        <>
          <dl className="grid gap-3 text-sm sm:grid-cols-3">
            <div className="rounded-lg border border-slate-800 bg-slate-950 p-3">
              <dt className="text-slate-500">Device</dt>
              <dd className="mt-1 font-medium text-slate-200">
                {startup.device.name}
              </dd>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-950 p-3">
              <dt className="text-slate-500">Platform</dt>
              <dd className="mt-1 font-medium text-slate-200">
                {startup.device.platform}
              </dd>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-950 p-3">
              <dt className="text-slate-500">GPIO mode</dt>
              <dd className="mt-1 font-medium text-slate-200">
                {startup.device.mock_gpio ? "Mock" : "Hardware"}
              </dd>
            </div>
          </dl>

          <div className="mt-6 overflow-x-auto rounded-lg border border-slate-800">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <thead className="bg-slate-950 text-slate-400">
                <tr>
                  <th className="px-4 py-3 font-medium">Pin</th>
                  <th className="px-4 py-3 font-medium">Digital</th>
                  <th className="px-4 py-3 font-medium">PWM</th>
                  <th className="px-4 py-3 font-medium">Duty cycle</th>
                  <th className="px-4 py-3 font-medium">Frequency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                {startup.state.gpio.map((pin) => (
                  <tr key={pin.pin}>
                    <td className="px-4 py-3 font-mono">{pin.pin}</td>
                    <td className="px-4 py-3">
                      {pin.digital.value ? "High" : "Low"}
                    </td>
                    <td className="px-4 py-3">
                      {pin.pwm.active ? "Active" : "Inactive"}
                    </td>
                    <td className="px-4 py-3">{pin.pwm.duty_cycle}%</td>
                    <td className="px-4 py-3">{pin.pwm.frequency} Hz</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </Section>
  );
}

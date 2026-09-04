# BerryBoard

A React and TypeScript dashboard for monitoring Raspberry Pi GPIO inputs and
running commands through a WebSocket server. It is intended to connect to the
[WebBerry](https://github.com/Raspberry-PI-Dashboard/WebBerry) server.

## Requirements

- Node.js 20 or newer
- npm
- A reachable WebSocket endpoint using `ws://` or `wss://`

## Getting Started

Install dependencies:

```bash
npm install
```

The WebSocket endpoint is optional. To configure one, create a `.env` file in
the project root:

```env
VITE_WEBSOCKET_URL=wss://example.com/socket
```

When `VITE_WEBSOCKET_URL` is not set, the client uses
`ws://localhost:8080`. The endpoint can also be changed from **Settings**.

Start the development server:

```bash
npm run dev
```

Open the local URL printed by Vite in your browser.

## Using the Client

The client connects automatically when the page loads. The sidebar provides two
views:

- **Monitor**: shows the latest state for GPIO pins `17`, `18`, `22`, `23`, `24`
  and `25`, and lets you request an individual reading. Readings are refreshed
  automatically using the configured interval, which defaults to 5 seconds.
- **Settings**: shows the WebSocket connection status and lets you change the
  refresh interval or endpoint.

The monitor also includes a remote shell. Select **Start shell**, enter a
command, and select **Run** when the connection is ready. Shell output and
server errors are displayed in the dashboard. Press `Ctrl+C` while the command
input is focused to send an interrupt and cancel the running command; the input
is cleared afterward.

Changing the endpoint reconnects the client. Select **Save URL** to store a
valid endpoint in a browser cookie for one year; it is restored on the next
page load. The client validates that URLs use `ws://` or `wss://`.

From **Settings**, select **Update server** to deploy the latest configured
branch and restart the `berryboard.service` systemd service. Progress messages
appear in the update log. The WebSocket connection closes while the gateway
restarts; reconnect after the service becomes active.

## WebSocket Protocol

Messages are JSON objects, one per WebSocket frame. The frontend currently
uses these requests:

```json
{"type":"pin","action":"read","pin":17}
{"type":"shell_start"}
{"type":"shell_input","data":"uname -a"}
{"type":"shell_input","data":"\u0003"}
{"type":"update"}
```

It handles connection and error messages, GPIO read responses, and shell
startup/output responses, and update progress messages with `type: "update"`.
The TypeScript request and response definitions are in `src/ws/protocol.ts`; the
server must implement the corresponding protocol.

## Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and create a production build |
| `npm run lint` | Run Oxlint |
| `npm run preview` | Preview the production build locally |

## Project Structure

```text
src/
├── components/              # Sidebar, GPIO, shell, and status UI
├── context/                 # WebSocket and GPIO providers
├── hooks/                   # WebSocket, GPIO, and shell behavior
├── layouts/                 # Shared sections and form components
├── ws/                      # WebSocket protocol types
├── App.tsx                  # Application layout and view navigation
├── index.css                # Global styles and Tailwind entry point
└── main.tsx                 # React entry point
```

## Technology

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Oxlint

## Production

Build the application with:

```bash
npm run build
```

The generated files are written to `dist/`. They can be served by any static
web server. Use `npm run preview` to inspect the production build locally.

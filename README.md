# WebSocket Monitor

A minimal React and TypeScript client for connecting to a specific WebSocket endpoint and displaying received messages and connection errors.
It will be used to connect to Raspberry PI ws server [WebBerry](https://github.com/Raspberry-PI-Dashboard/WebBerry)

## Requirements

- Node.js 20 or newer
- npm
- A reachable WebSocket endpoint using `ws://` or `wss://`

## Getting Started

Install dependencies:

```bash
npm install
```

Create a local environment file from the example:

```bash
cp .env.example .env
```

Set the endpoint in `.env`:

```env
VITE_WEBSOCKET_URL=wss://example.com/socket
```

Start the development server:

```bash
npm run dev
```

Open the local URL printed by Vite in your browser.

## Using the Client

The client connects automatically when the page loads. It displays:

- Current connection status
- Received WebSocket messages
- Invalid URL, connection, and abnormal close errors

You can edit the endpoint in the URL field and reconnect to the new value. Select **Save URL** to store it in a browser cookie for one year. The saved endpoint is restored on the next page load.

This client intentionally receives messages only; it does not send data to the WebSocket server.

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
├── components/
│   └── WebSocketStatus.tsx  # Connection status and message display
├── hooks/
│   └── useWebSocket.ts      # WebSocket lifecycle and received messages
├── App.tsx                  # Application layout
└── main.tsx                 # React entry point
```

## Technology

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Oxlint

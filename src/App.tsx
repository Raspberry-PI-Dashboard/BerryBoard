import { WebSocketStatus } from "./components/WebSocketStatus";
import { I2CSettings } from "./i2c/I2CSettings";
import { DashboardSettings } from "./components/DashboardSettings";
import { GpioPage } from "./components/GpioPage";
import { WebSocketProvider } from "./context/WebSocketProvider";
import { GpioProvider } from "./context/GpioProvider";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./components/Dashboard";
import type { Page } from "./components/Sidebar";
import { useState } from "react";
import { Background } from "./dashboard/Background";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

const defaultUrl = import.meta.env.VITE_WEBSOCKET_URL ?? "ws://localhost:8080";
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <BrowserRouter>
      <WebSocketProvider initialUrl={defaultUrl}>
        <GpioProvider>
          <AppContent
            sidebarOpen={sidebarOpen}
            onSidebarToggle={() => setSidebarOpen((open) => !open)}
          />
        </GpioProvider>
      </WebSocketProvider>
    </BrowserRouter>
  );
}

function AppContent({
  sidebarOpen,
  onSidebarToggle,
}: {
  sidebarOpen: boolean;
  onSidebarToggle: () => void;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const activePage: Page =
    location.pathname === "/gpio" || location.pathname === "/pwm"
      ? "gpio"
      : location.pathname === "/i2c"
        ? "i2c"
        : location.pathname === "/settings"
          ? "settings"
          : "monitor";

  function navigateToPage(page: Page) {
    navigate(page === "monitor" ? "/" : `/${page}`);
  }

  return (
    <div className="theme-page flex min-h-screen overflow-x-hidden">
      <header className={sidebarOpen ? "w-16 shrink-0 sm:w-64" : "w-16 shrink-0"}>
        <Sidebar
          activePage={activePage}
          onNavigate={navigateToPage}
          open={sidebarOpen}
          onToggle={onSidebarToggle}
        />
      </header>
      <Background>
        <div className="min-w-0 px-4 py-6 sm:px-6 sm:py-10 lg:px-10">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/gpio" element={<GpioPage />} />
            <Route path="/i2c" element={<I2CSettings />} />
            <Route path="/configuration" element={<Navigate replace to="/gpio" />} />
            <Route path="/pwm" element={<Navigate replace to="/gpio" />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
          </div>
        </div>
      </Background>
    </div>
  );
}

function SettingsPage() {
  return (
    <>
      <WebSocketStatus />
      <DashboardSettings />
    </>
  );
}

export default App;

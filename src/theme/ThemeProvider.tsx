import type { ReactNode } from "react";
import { defaultTheme, themeToCssVariables, type Theme } from "./theme";

type ThemeProviderProps = {
  children: ReactNode;
  theme?: Theme;
};

export function ThemeProvider({ children, theme = defaultTheme }: ThemeProviderProps) {
  return (
    <div className="theme-scope" style={themeToCssVariables(theme)}>
      {children}
    </div>
  );
}

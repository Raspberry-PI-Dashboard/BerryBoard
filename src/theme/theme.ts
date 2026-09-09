export type Theme = {
  colors: {
    page: string;
    section: string;
    widget: string;
    panel: string;
    input: string;
    accent: string;
    accentStrong: string;
    text: string;
    textMuted: string;
    divider: string;
    success: string;
    warning: string;
    error: string;
    errorSurface: string;
  };
  glows: {
    section: string;
    input: string;
    button: string;
    divider: string;
    error: string;
  };
  radii: {
    section: string;
    control: string;
    pill: string;
  };
};

export const defaultTheme: Theme = {
  colors: {
    page: "#010b0d",
    section: "rgba(5, 40, 44, 0.94)",
    widget: "rgba(3, 30, 34, 0.96)",
    panel: "rgba(1, 18, 21, 0.98)",
    input: "rgba(1, 18, 21, 0.62)",
    accent: "#67e8f9",
    accentStrong: "#22d3ee",
    text: "#f1f5f9",
    textMuted: "#94a3b8",
    divider: "rgba(103, 232, 249, 0.28)",
    success: "#34d399",
    warning: "#fbbf24",
    error: "#fb7185",
    errorSurface: "rgba(251, 113, 133, 0.1)",
  },
  glows: {
    section: "inset 0 0 18px rgba(0, 255, 225, 0.12)",
    input: "inset 0 0 10px rgba(0, 255, 225, 0.1)",
    button: "inset 0 0 10px rgba(0, 255, 225, 0.1)",
    divider: "0 0 2px rgba(0, 255, 225, 0.18)",
    error: "inset 0 0 10px rgba(251, 113, 133, 0.28)",
  },
  radii: {
    section: "0.5rem",
    control: "0.375rem",
    pill: "9999px",
  },
};

export function themeToCssVariables(theme: Theme) {
  return {
    "--theme-color-page": theme.colors.page,
    "--theme-color-section": theme.colors.section,
    "--theme-color-widget": theme.colors.widget,
    "--theme-color-panel": theme.colors.panel,
    "--theme-color-input": theme.colors.input,
    "--theme-color-accent": theme.colors.accent,
    "--theme-color-accent-strong": theme.colors.accentStrong,
    "--theme-color-text": theme.colors.text,
    "--theme-color-text-muted": theme.colors.textMuted,
    "--theme-color-divider": theme.colors.divider,
    "--theme-color-success": theme.colors.success,
    "--theme-color-warning": theme.colors.warning,
    "--theme-color-error": theme.colors.error,
    "--theme-color-error-surface": theme.colors.errorSurface,
    "--theme-glow-section": theme.glows.section,
    "--theme-glow-input": theme.glows.input,
    "--theme-glow-button": theme.glows.button,
    "--theme-glow-divider": theme.glows.divider,
    "--theme-glow-error": theme.glows.error,
    "--theme-radius-section": theme.radii.section,
    "--theme-radius-control": theme.radii.control,
    "--theme-radius-pill": theme.radii.pill,
  } as import("react").CSSProperties;
}

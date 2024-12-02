import type { ThemeProviderProps } from 'next-themes';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { SpeedInsights } from "@vercel/speed-insights/next"

export const ThemeProvider = ({
  children,
  ...properties
}: ThemeProviderProps) => (
  <NextThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
    {...properties}
  >
    {children}
    <SpeedInsights />
  </NextThemeProvider>
);

import { AnalyticsProvider } from '@repo/analytics';
import type { ThemeProviderProps } from 'next-themes';

import { SpeedInsights } from '@vercel/speed-insights/next';
import { Toaster } from './components/ui/sonner';
import { TooltipProvider } from './components/ui/tooltip';
import { ThemeProvider } from './providers/theme';

type DesignSystemProviderProperties = ThemeProviderProps;

export const DesignSystemProvider = ({
  children,
  ...properties
}: DesignSystemProviderProperties) => (
  <ThemeProvider {...properties}>
    <AnalyticsProvider>
      <TooltipProvider>{children}</TooltipProvider>
      <Toaster />
      <SpeedInsights />
    </AnalyticsProvider>
  </ThemeProvider>
);

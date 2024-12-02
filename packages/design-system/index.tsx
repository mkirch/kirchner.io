import { env } from '@repo/env';
import type { ThemeProviderProps } from 'next-themes';
import dynamic from 'next/dynamic';
import { Toaster } from './components/ui/sonner';
import { TooltipProvider } from './components/ui/tooltip';
import { ThemeProvider } from './providers/theme';

const VercelToolbar = dynamic(() =>
  import('@vercel/toolbar/next').then((mod) => mod.VercelToolbar)
);

type DesignSystemProviderProperties = ThemeProviderProps;

export const DesignSystemProvider = ({
  children,
  ...properties
}: DesignSystemProviderProperties) => (
  <ThemeProvider {...properties}>
    <TooltipProvider>{children}</TooltipProvider>
    <Toaster />
    {env.NODE_ENV === 'development' && <VercelToolbar />}
  </ThemeProvider>
);

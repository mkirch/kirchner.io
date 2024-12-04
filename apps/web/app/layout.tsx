import '@repo/design-system/styles/globals.css';
import './styles/web.css';
import { DesignSystemProvider } from '@repo/design-system';
import { fonts } from '@repo/design-system/lib/fonts';
import { Analytics } from '@vercel/analytics/react';
import type { ReactNode } from 'react';
import { Footer } from './components/footer';
import { Header } from './components/Header';

type RootLayoutProperties = {
  readonly children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProperties) => (
  <html lang="en" className={fonts} suppressHydrationWarning>
    <body>
      <DesignSystemProvider>
        <Header />
        {children}
        <Footer />
        <Analytics />
      </DesignSystemProvider>
    </body>
  </html>
);

export default RootLayout;

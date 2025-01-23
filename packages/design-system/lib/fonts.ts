import { cn } from '@repo/design-system/lib/utils';


import { Inter, Inconsolata, Newsreader, UnifrakturCook } from 'next/font/google'

export const unifraktur = UnifrakturCook({
  weight: '700',
  subsets: ['latin'],
  variable: '--font-unifraktur',
});

const inter = Inter({
  weight: 'variable',
  subsets: ['latin'],
  variable: '--font-inter',
});

const inconsolata = Inconsolata({
  weight: 'variable',
  subsets: ['latin'],
  variable: '--font-inconsolata',
});

const newsreader = Newsreader({
  weight: 'variable',
  subsets: ['latin'],
  variable: '--font-newsreader',
});

export const fonts = cn(
  unifraktur.variable,
  inter.variable,
  inconsolata.variable,
  newsreader.variable,
  'touch-manipulation font-sans antialiased'
);

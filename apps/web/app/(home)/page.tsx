import { Hero } from '@/app/(home)/components/hero';
import { createMetadata } from '@repo/seo/metadata';
import type { Metadata } from 'next';

const meta = {
  title: 'Kirchner.io',
  description: 'Kirchner.io',
};

export const metadata: Metadata = createMetadata(meta);

export default function Home() {
  return (
    <>
      <Hero />
    </>
  );
}

import Gallery from '@/app/components/Gallery';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Art and Photography ./kirchner.io',
  description: 'Art and photography by Michael Kirchner',
};

export default function ArtPage() {
  return (
    <Suspense fallback={<div>Loading gallery...</div>}>
      <Gallery />
    </Suspense>
  );
}

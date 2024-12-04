import type { Metadata } from 'next';
import { Suspense } from 'react';
import Gallery from '../components/Gallery';

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

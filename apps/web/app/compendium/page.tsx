import { createMetadata } from '@repo/seo/metadata';
import type { Metadata } from 'next';
import CompendiumIndex from '../components/CompendiumIndex';

const title = 'Compendium';
const description = 'Information found relevant to the web, life, and tech.';

export const metadata: Metadata = createMetadata({ title, description });

export default function Page() {
  return <CompendiumIndex />;
}

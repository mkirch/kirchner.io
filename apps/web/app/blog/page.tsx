import { createMetadata } from '@repo/seo/metadata';
import type { Metadata } from 'next';
import BlogIndex from '../components/BlogIndex';

const title = 'Blog';
const description = 'Thoughts, ideas, and opinions.';

export const metadata: Metadata = createMetadata({ title, description });

export default function Page() {
  return <BlogIndex />;
}

import { list } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function GET() {
  const { blobs } = await list({ prefix: 'photography/' });

  const photos = blobs.map((blob) => {
    const [_, __, location, ...tagParts] = blob.pathname.split('/');
    const tags = tagParts.join('/').split('-');
    return {
      id: blob.pathname,
      src: blob.url,
      alt: blob.pathname.split('/').pop()?.split('.')[0] || 'Untitled',
      width: 4000, // You might want to store this metadata separately
      height: 3000, // You might want to store this metadata separately
      tags,
      location,
      description: `A beautiful photo taken in ${location}`,
    };
  });

  return NextResponse.json(photos);
}

export const runtime = 'edge';

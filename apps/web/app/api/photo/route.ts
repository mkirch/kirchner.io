import { list } from '@vercel/blob';
import { NextResponse } from 'next/server';

interface PhotoMetadata {
  title: string;
  description: string;
  tags: string[];
  location: string;
  dateTaken: string;
  width: number;
  height: number;
}

interface Photo {
  id: string;
  src: string;
  alt: string;
  metadata: PhotoMetadata;
}

const imageFileRegex = /\.(jpe?g|png)$/i;

export async function GET() {
  try {
    const { blobs } = await list({ prefix: 'photography/' });

    const imageBlobs = blobs.filter((blob) =>
      imageFileRegex.test(blob.pathname)
    );
    const jsonBlobsMap = new Map(
      blobs
        .filter((blob) => blob.pathname.endsWith('.json'))
        .map((jsonBlob) => [
          jsonBlob.pathname.split('/').pop()?.replace('.json', ''),
          jsonBlob,
        ])
    );

    const photos: Photo[] = await Promise.all(
      imageBlobs.map(async (imageBlob) => {
        const id = imageBlob.pathname;
        const src = imageBlob.url;
        const fileName = id.split('/').pop() || '';
        const baseName = fileName.split('.')[0];

        let metadata: PhotoMetadata = {
          title: baseName,
          description: '',
          tags: [],
          location: '',
          dateTaken: '',
          width: 0,
          height: 0,
        };

        const jsonBlob = jsonBlobsMap.get(baseName);
        if (jsonBlob) {
          try {
            const jsonResponse = await fetch(jsonBlob.url);
            if (!jsonResponse.ok) {
              throw new Error(`HTTP error! status: ${jsonResponse.status}`);
            }
            const jsonContent = await jsonResponse.json();
            metadata = { ...metadata, ...jsonContent };
          } catch {
            throw new Error(
              `Error fetching or parsing JSON metadata for ${fileName}`
            );
          }
        }

        return {
          id,
          src,
          alt: metadata.title || baseName,
          metadata,
        };
      })
    );

    return NextResponse.json(photos);
  } catch {
    return NextResponse.json(
      { error: 'An error occurred while fetching photos' },
      { status: 500 }
    );
  }
}

export const runtime = 'edge';

// Thumbnails.tsx
'use client';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { useCallback } from 'react';

// Import the Photo type from the Gallery component
import type { Photo } from '@/app/components/Gallery';

const shimmer = (w: number, h: number) => `
  <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlinkHref="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite" />
  </svg>
`;

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

interface ThumbnailsProps {
  photos: Photo[];
  viewMode: 'grid' | 'list' | 'table';
  thumbnailSize: 'small' | 'medium' | 'large';
  onPhotoClick: (photo: Photo) => void;
}

export default function Thumbnails({
  photos,
  viewMode,
  thumbnailSize,
  onPhotoClick,
}: ThumbnailsProps) {
  const getThumbnailSize = useCallback(() => {
    switch (thumbnailSize) {
      case 'small':
        return { width: 150, columns: 6 };
      case 'medium':
        return { width: 250, columns: 4 };
      case 'large':
        return { width: 350, columns: 3 };
      default:
        return { width: 250, columns: 4 };
    }
  }, [thumbnailSize]);

  const renderListView = () => {
    if (photos.length === 0) {
      return <p className="p-4 text-center">No photos available.</p>;
    }

    return (
      <motion.div
        className="space-y-4 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <AnimatePresence>
          {photos.map((photo) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                variant="ghost"
                className="h-auto w-full justify-start p-0"
                onClick={() => onPhotoClick(photo)}
              >
                <motion.div
                  className="flex w-full items-center space-x-4 rounded-lg p-2"
                  whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
                >
                  <div className="relative h-24 w-24 overflow-hidden rounded-md">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover"
                      sizes="96px"
                      placeholder="blur"
                      blurDataURL={`data:image/svg+xml;base64,${toBase64(
                        shimmer(96, 96)
                      )}`}
                    />
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium">{photo.metadata.title}</p>
                    {photo.metadata.location && (
                      <p className="text-muted-foreground text-sm">
                        {photo.metadata.location}
                      </p>
                    )}
                    {photo.metadata.dateTaken && (
                      <p className="text-muted-foreground text-sm">
                        {photo.metadata.dateTaken}
                      </p>
                    )}
                  </div>
                </motion.div>
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    );
  };

  const renderTableView = () => {
    if (photos.length === 0) {
      return <p className="p-4 text-center">No photos available.</p>;
    }

    return (
      <div className="overflow-x-auto p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Thumbnail</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Date Taken</TableHead>
              <TableHead>Tags</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {photos.map((photo) => (
                <motion.tr
                  key={photo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => onPhotoClick(photo)}
                  className="cursor-pointer hover:bg-muted"
                >
                  <TableCell>
                    <div className="relative h-16 w-16">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        className="rounded-md object-cover"
                        sizes="64px"
                        placeholder="blur"
                        blurDataURL={`data:image/svg+xml;base64,${toBase64(
                          shimmer(64, 64)
                        )}`}
                      />
                    </div>
                  </TableCell>
                  <TableCell>{photo.metadata.title}</TableCell>
                  <TableCell>{photo.metadata.location || '—'}</TableCell>
                  <TableCell>{photo.metadata.dateTaken || '—'}</TableCell>
                  <TableCell>
                    {photo.metadata.tags ? photo.metadata.tags.join(', ') : '—'}
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>
    );
  };

  const renderGridView = () => {
    if (photos.length === 0) {
      return <p className="p-4 text-center">No photos available.</p>;
    }

    const { width: thumbWidth, columns: maxColumns } = getThumbnailSize();

    return (
      <div className="p-4">
        <div
          className="grid auto-rows-fr gap-4"
          style={{
            gridTemplateColumns: `repeat(auto-fill, minmax(${thumbWidth}px, 1fr))`,
            maxWidth: `${maxColumns * (thumbWidth + 16)}px`,
            margin: '0 auto',
          }}
        >
          <AnimatePresence>
            {photos.map((photo) => (
              <motion.button
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => onPhotoClick(photo)}
                className="group relative cursor-pointer overflow-hidden rounded-lg border-none bg-transparent p-0"
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes={`(max-width: ${thumbWidth}px) 100vw, ${thumbWidth}px`}
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(
                      shimmer(thumbWidth, thumbWidth)
                    )}`}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute bottom-0 p-4">
                    <p className="text-left font-semibold text-white">
                      {photo.metadata.title}
                    </p>
                    {photo.metadata.location && (
                      <p className="text-left font-mono text-sm text-white/80">
                        {photo.metadata.location}
                      </p>
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>
    );
  };

  return (
    <div>
      {viewMode === 'grid' && renderGridView()}
      {viewMode === 'list' && renderListView()}
      {viewMode === 'table' && renderTableView()}
    </div>
  );
}

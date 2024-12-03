'use client';

import type { Photo } from '@/app/types/photo';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

interface ThumbnailsProps {
  photos: Photo[];
  viewMode: 'grid' | 'list' | 'table';
  thumbnailSize: 'small' | 'medium' | 'large';
  onPhotoClick: (index: number) => void;
}

export default function Thumbnails({
  photos,
  viewMode,
  thumbnailSize,
  onPhotoClick,
}: ThumbnailsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState<Photo[][]>([]);

  const getThumbnailSize = useCallback(() => {
    switch (thumbnailSize) {
      case 'small':
        return { width: 200, columns: 6 };
      case 'medium':
        return { width: 300, columns: 4 };
      case 'large':
        return { width: 400, columns: 3 };
      default:
        return { width: 300, columns: 4 }; // Default to medium size
    }
  }, [thumbnailSize]);

  useEffect(() => {
    const calculateColumns = () => {
      if (!containerRef.current) {
        return;
      }

      const { width: thumbWidth, columns: maxColumns } = getThumbnailSize();
      const containerWidth = containerRef.current.offsetWidth;
      const columnCount = Math.min(
        maxColumns,
        Math.floor(containerWidth / thumbWidth)
      );

      const cols: Photo[][] = Array.from({ length: columnCount }, () => []);

      for (const photo of photos) {
        const shortestCol = cols.reduce(
          (acc, col, i) => {
            const colHeight = col.reduce((sum, photo) => {
              return sum + (photo.height / photo.width) * thumbWidth;
            }, 0);
            return colHeight < acc.height
              ? { height: colHeight, index: i }
              : acc;
          },
          { height: Number.POSITIVE_INFINITY, index: 0 }
        );

        cols[shortestCol.index].push(photo);
      }

      setColumns(cols);
    };

    calculateColumns();
    window.addEventListener('resize', calculateColumns);
    return () => window.removeEventListener('resize', calculateColumns);
  }, [photos, getThumbnailSize]);

  if (viewMode === 'table') {
    return (
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Thumbnail</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Tags</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {photos.map((photo) => (
              <TableRow
                key={photo.id}
                onClick={() => onPhotoClick(photos.indexOf(photo))}
                className="cursor-pointer hover:bg-muted"
              >
                <TableCell>
                  <div className="relative h-40 w-40">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="rounded-md object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell>{photo.alt}</TableCell>
                <TableCell>{photo.location}</TableCell>
                <TableCell>{photo.tags.join(', ')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (viewMode === 'grid') {
    const { width: thumbWidth } = getThumbnailSize();

    return (
      <motion.div
        ref={containerRef}
        className="relative w-full p-2"
        style={{ minHeight: '200px' }}
      >
        {columns.map((column, columnIndex) => (
          <div
            key={column[0]?.id || Math.random().toString(36).substr(2, 9)}
            className="absolute top-0"
            style={{
              left: `${columnIndex * thumbWidth}px`,
              width: thumbWidth - 8,
            }}
          >
            {column.map((photo) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
                className="mb-2"
              >
                <Button
                  variant="ghost"
                  className="h-auto w-full overflow-hidden p-0"
                  onClick={() => onPhotoClick(photos.indexOf(photo))}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-full"
                    style={{
                      height: (photo.height / photo.width) * (thumbWidth - 8),
                    }}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="rounded-lg object-cover"
                    />
                  </motion.div>
                </Button>
              </motion.div>
            ))}
          </div>
        ))}
      </motion.div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      {photos.map((photo) => (
        <motion.div
          key={photo.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            variant="ghost"
            className="h-auto w-full justify-start p-0"
            onClick={() => onPhotoClick(photos.indexOf(photo))}
          >
            <div className="relative h-40 w-40">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <div className="ml-4 text-left">
              <p className="font-medium">{photo.alt}</p>
              <p className="text-muted-foreground text-sm">{photo.location}</p>
            </div>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}

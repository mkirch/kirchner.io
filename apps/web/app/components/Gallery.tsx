// Gallery.tsx
'use client';

import { Button } from '@repo/design-system/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/design-system/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/design-system/components/ui/select';
import { FilterIcon, GridIcon, ListIcon, TableIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import PhotoInfo from './PhotoInfo';
import PhotoView from './PhotoView';
import Thumbnails from './Thumbnails';

export interface PhotoMetadata {
  title: string;
  description?: string;
  tags?: string[];
  location?: string;
  dateTaken?: string;
  width?: number;
  height?: number;
}

export interface Photo {
  id: string;
  src: string;
  alt: string;
  metadata: PhotoMetadata;
}

const ITEMS_PER_PAGE = 20;

export default function Gallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [displayedPhotos, setDisplayedPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showPhotoInfo, setShowPhotoInfo] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'table'>('grid');
  const [thumbnailSize, setThumbnailSize] = useState<
    'small' | 'medium' | 'large'
  >('medium');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/photo');
        if (!response.ok) {
          throw new Error('Failed to fetch photos');
        }
        const data = await response.json();
        setPhotos(data);
        setDisplayedPhotos(data.slice(0, ITEMS_PER_PAGE));
        setIsLoading(false);
      } catch {
        setError(
          'Failed to load photos. Please check your connection and try again.'
        );
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  useEffect(() => {
    if (filter) {
      const filteredPhotos = photos.filter(
        (photo) =>
          photo.metadata.tags?.includes(filter) ||
          photo.metadata.location?.toLowerCase().includes(filter.toLowerCase())
      );
      setDisplayedPhotos(filteredPhotos.slice(0, ITEMS_PER_PAGE));
    } else {
      setDisplayedPhotos(photos.slice(0, ITEMS_PER_PAGE));
    }
  }, [filter, photos]);

  const loadMorePhotos = useCallback(() => {
    const currentLength = displayedPhotos.length;
    const morePhotos = photos.slice(
      currentLength,
      currentLength + ITEMS_PER_PAGE
    );
    setDisplayedPhotos((prevPhotos) => [...prevPhotos, ...morePhotos]);
  }, [photos, displayedPhotos]);

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        loadMorePhotos();
      }
    }
  }, [loadMorePhotos]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    setIsFullScreen(true);
    setShowPhotoInfo(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFullScreen && selectedPhoto) {
        if (e.key === 'ArrowLeft') {
          const currentIndex = photos.findIndex(
            (p) => p.id === selectedPhoto.id
          );
          setSelectedPhoto(
            photos[(currentIndex - 1 + photos.length) % photos.length]
          );
          setShowPhotoInfo(false);
        } else if (e.key === 'ArrowRight') {
          const currentIndex = photos.findIndex(
            (p) => p.id === selectedPhoto.id
          );
          setSelectedPhoto(photos[(currentIndex + 1) % photos.length]);
          setShowPhotoInfo(false);
        } else if (e.key === 'Escape') {
          setIsFullScreen(false);
          setShowPhotoInfo(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullScreen, photos, selectedPhoto]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-gray-900 border-t-2 border-b-2" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="font-semibold text-2xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <motion.div
        className="sticky top-[64px] z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto flex items-center justify-between py-4">
          <div className="flex items-baseline space-x-2">
            <h2 className="mr-5 font-fraktur text-3xl">Art</h2>
            <p className="overflow-hidden truncate whitespace-nowrap font-mono text-muted-foreground text-sm">
              Photography by Michael Kirchner
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Select
              value={thumbnailSize}
              onValueChange={(value: 'small' | 'medium' | 'large') =>
                setThumbnailSize(value)
              }
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Thumbnail size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
            >
              <GridIcon className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('list')}
              aria-label="List view"
            >
              <ListIcon className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'table' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('table')}
              aria-label="Table view"
            >
              <TableIcon className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <FilterIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => setFilter(null)}>
                  All
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setFilter('landscape')}>
                  Landscape
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setFilter('portrait')}>
                  Portrait
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setFilter('abstract')}>
                  Abstract
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </motion.div>

      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden"
      >
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            {isFullScreen && selectedPhoto ? (
              <PhotoView
                key="photoview"
                photo={selectedPhoto}
                onClose={() => setIsFullScreen(false)}
                onPrev={() => {
                  const currentIndex = photos.findIndex(
                    (p) => p.id === selectedPhoto.id
                  );
                  setSelectedPhoto(
                    photos[(currentIndex - 1 + photos.length) % photos.length]
                  );
                }}
                onNext={() => {
                  const currentIndex = photos.findIndex(
                    (p) => p.id === selectedPhoto.id
                  );
                  setSelectedPhoto(photos[(currentIndex + 1) % photos.length]);
                }}
                onToggleInfo={() => setShowPhotoInfo(!showPhotoInfo)}
              />
            ) : (
              <motion.div
                key="gallery"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Thumbnails
                  photos={displayedPhotos}
                  viewMode={viewMode}
                  thumbnailSize={thumbnailSize}
                  onPhotoClick={handlePhotoClick}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <PhotoInfo
        photo={showPhotoInfo ? selectedPhoto : null}
        onClose={() => setShowPhotoInfo(false)}
      />
    </div>
  );
}

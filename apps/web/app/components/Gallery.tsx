'use client';

import type { Photo } from '@/app/types/photo';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { GridIcon, ListIcon, TableIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import PhotoInfo from './PhotoInfo';
import PhotoView from './PhotoView';
import Thumbnails from './Thumbnails';

export default function Gallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'table'>('grid');
  const [thumbnailSize, setThumbnailSize] = useState<
    'small' | 'medium' | 'large'
  >('medium');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      const response = await fetch('/api/photos');
      const data = await response.json();
      setPhotos(data);
    };

    fetchPhotos();
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentPhotoIndex((prev) =>
          prev > 0 ? prev - 1 : photos.length - 1
        );
      }
      if (e.key === 'ArrowRight') {
        setCurrentPhotoIndex((prev) =>
          prev < photos.length - 1 ? prev + 1 : 0
        );
      }
      if (e.key === 'Escape') {
        setIsFullScreen(false);
      }
    },
    [photos.length]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const downloadPhoto = () => {
    if (photos.length === 0) {
      return;
    }
    const link = document.createElement('a');
    link.href = photos[currentPhotoIndex].src;
    link.download = `photo-${photos[currentPhotoIndex].id.split('/').pop()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sharePhoto = () => {
    if (photos.length === 0) {
      return;
    }
    if (navigator.share) {
      navigator.share({
        title: photos[currentPhotoIndex].alt,
        url: photos[currentPhotoIndex].src,
      });
    } else {
      alert('Sharing is not supported on this browser');
    }
  };

  if (photos.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col">
      <div className="flex items-center justify-between p-4">
        <h1 className="font-bold text-2xl">Photo Gallery</h1>
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
              <SelectItem value="small">Small (200px)</SelectItem>
              <SelectItem value="medium">Medium (300px)</SelectItem>
              <SelectItem value="large">Large (400px)</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <GridIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode('list')}
          >
            <ListIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode('table')}
          >
            <TableIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {isFullScreen ? (
        <PhotoView
          photo={photos[currentPhotoIndex]}
          onClose={() => setIsFullScreen(false)}
          onPrev={() =>
            setCurrentPhotoIndex((prev) =>
              prev > 0 ? prev - 1 : photos.length - 1
            )
          }
          onNext={() =>
            setCurrentPhotoIndex((prev) =>
              prev < photos.length - 1 ? prev + 1 : 0
            )
          }
          onInfo={() => setSelectedPhoto(photos[currentPhotoIndex])}
          onDownload={downloadPhoto}
          onShare={sharePhoto}
        />
      ) : (
        <div className="flex-grow overflow-auto">
          <Thumbnails
            photos={photos}
            viewMode={viewMode}
            thumbnailSize={thumbnailSize}
            onPhotoClick={(index) => {
              setCurrentPhotoIndex(index);
              setIsFullScreen(true);
            }}
          />
        </div>
      )}
      <PhotoInfo photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
    </div>
  );
}

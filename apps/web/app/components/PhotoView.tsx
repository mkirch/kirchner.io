// PhotoView.tsx
'use client';

import { Button } from '@repo/design-system/components/ui/button';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  InfoIcon,
  RotateCwIcon,
  XIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { Photo } from './Gallery';

interface PhotoViewProps {
  photo: Photo;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onToggleInfo: () => void;
}

export default function PhotoView({
  photo,
  onClose,
  onPrev,
  onNext,
  onToggleInfo,
}: PhotoViewProps) {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);

  const handleZoomIn = () =>
    setScale((prevScale) => Math.min(prevScale + 0.1, 3));
  const handleZoomOut = () =>
    setScale((prevScale) => Math.max(prevScale - 0.1, 0.5));
  const handleRotate = () =>
    setRotation((prevRotation) => (prevRotation + 90) % 360);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        onPrev();
      } else if (e.key === 'ArrowRight') {
        onNext();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onPrev, onNext, onClose]);

  const { width, height } = photo.metadata;
  const aspectRatio = width && height ? `${width} / ${height}` : 'auto';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
    >
      {/* Control Buttons */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="absolute top-4 right-4 flex space-x-2"
      >
        <Button
          variant="ghost"
          size="icon"
          className="text-white"
          onClick={onToggleInfo}
          aria-label="Toggle info"
        >
          <InfoIcon className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-white"
          onClick={handleZoomIn}
          aria-label="Zoom in"
        >
          <ZoomInIcon className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-white"
          onClick={handleZoomOut}
          aria-label="Zoom out"
        >
          <ZoomOutIcon className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-white"
          onClick={handleRotate}
          aria-label="Rotate"
        >
          <RotateCwIcon className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-white"
          onClick={onClose}
          aria-label="Close"
        >
          <XIcon className="h-6 w-6" />
        </Button>
      </motion.div>

      {/* Previous Button */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="-translate-y-1/2 absolute top-1/2 left-4 transform"
      >
        <Button
          variant="ghost"
          size="icon"
          className="text-white"
          onClick={onPrev}
          aria-label="Previous image"
        >
          <ChevronLeftIcon className="h-8 w-8" />
        </Button>
      </motion.div>

      {/* Next Button */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="-translate-y-1/2 absolute top-1/2 right-4 transform"
      >
        <Button
          variant="ghost"
          size="icon"
          className="text-white"
          onClick={onNext}
          aria-label="Next image"
        >
          <ChevronRightIcon className="h-8 w-8" />
        </Button>
      </motion.div>

      {/* Image Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative mx-auto h-full max-h-[90vh] w-full max-w-7xl"
        style={{
          aspectRatio: aspectRatio,
        }}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-contain"
          quality={100}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            transform: `scale(${scale}) rotate(${rotation}deg)`,
            transition: 'transform 0.3s ease-in-out',
          }}
        />
      </motion.div>
    </motion.div>
  );
}

import type { Photo } from '@/app/types/photo';
import { Button } from '@/components/ui/button';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  InfoIcon,
  Share2Icon,
  XIcon,
} from 'lucide-react';
import Image from 'next/image';

interface PhotoViewProps {
  photo: Photo;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onInfo: () => void;
  onDownload: () => void;
  onShare: () => void;
}

export default function PhotoView({
  photo,
  onClose,
  onPrev,
  onNext,
  onInfo,
  onDownload,
  onShare,
}: PhotoViewProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <div className="absolute top-4 right-4 flex space-x-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-white"
          onClick={onInfo}
        >
          <InfoIcon className="h-6 w-6" />
          <span className="sr-only">Info</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-white"
          onClick={onDownload}
        >
          <DownloadIcon className="h-6 w-6" />
          <span className="sr-only">Download</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-white"
          onClick={onShare}
        >
          <Share2Icon className="h-6 w-6" />
          <span className="sr-only">Share</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-white"
          onClick={onClose}
        >
          <XIcon className="h-6 w-6" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="-translate-y-1/2 absolute top-1/2 left-4 transform text-white"
        onClick={onPrev}
      >
        <ChevronLeftIcon className="h-8 w-8" />
        <span className="sr-only">Previous</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="-translate-y-1/2 absolute top-1/2 right-4 transform text-white"
        onClick={onNext}
      >
        <ChevronRightIcon className="h-8 w-8" />
        <span className="sr-only">Next</span>
      </Button>
      <div className="relative mx-auto h-full max-h-[90vh] w-full max-w-7xl">
        <Image
          src={photo.src}
          alt={photo.alt}
          layout="fill"
          objectFit="contain"
          quality={100}
          priority
        />
      </div>
    </div>
  );
}

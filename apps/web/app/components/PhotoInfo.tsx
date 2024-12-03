import type { Photo } from '@/app/types/photo';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface PhotoInfoProps {
  photo: Photo | null;
  onClose: () => void;
}

export default function PhotoInfo({ photo, onClose }: PhotoInfoProps) {
  if (!photo) {
    return null;
  }

  return (
    <Dialog open={!!photo} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{photo.alt}</DialogTitle>
          <DialogDescription>
            <p>
              <strong>Location:</strong> {photo.location}
            </p>
            <p>
              <strong>Tags:</strong> {photo.tags.join(', ')}
            </p>
            <p>
              <strong>Description:</strong> {photo.description}
            </p>
            <p>
              <strong>Dimensions:</strong> {photo.width}x{photo.height}
            </p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

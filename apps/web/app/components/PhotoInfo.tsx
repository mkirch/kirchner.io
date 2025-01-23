// PhotoInfo.tsx
'use client';

import { Badge } from '@repo/design-system/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@repo/design-system/components/ui/dialog';
import { motion } from 'motion/react';
import type { Photo } from './Gallery';

interface PhotoInfoProps {
  photo: Photo | null;
  onClose: () => void;
}

export default function PhotoInfo({ photo, onClose }: PhotoInfoProps) {
  if (!photo) {
    return null;
  }

  const { title, description, tags, location, dateTaken } = photo.metadata;

  return (
    <Dialog open={!!photo} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {location && (
                <p className="mb-2 text-muted-foreground text-sm">
                  <strong>Location:</strong> {location}
                </p>
              )}
              {dateTaken && (
                <p className="mb-2 text-muted-foreground text-sm">
                  <strong>Date Taken:</strong> {dateTaken}
                </p>
              )}
              {description && (
                <p className="mb-4 text-muted-foreground text-sm">
                  {description}
                </p>
              )}
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <motion.div
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Badge variant="secondary">{tag}</Badge>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

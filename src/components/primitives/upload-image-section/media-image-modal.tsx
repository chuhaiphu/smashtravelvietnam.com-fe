'use client';
import '@vinaup/media-ui/dist/index.css';
import { MediaModal , type IMedia, type UploadResult, type ICreateMedia } from '@vinaup/media-ui';
import { uploadImageAction } from "@/actions/upload-action";
import { createManyMediaAction, getAllMediaAction } from "@/actions/media-action";
import { useState, useEffect, useEffectEvent } from 'react';
import { notifications } from "@mantine/notifications";

interface MediaImageModalProps {
  opened: boolean;
  onClose: () => void;
  onSelect: (imageUrl: string) => void;
}

export default function MediaImageModal({
  opened,
  onClose,
  onSelect,
}: MediaImageModalProps) {
  const [availableImages, setAvailableImages] = useState<IMedia[]>([]);

  const fetchAvailableImages = useEffectEvent(async () => {
    const response = await getAllMediaAction();
    const imagesList = response.data?.filter((media) => media.type === 'image') as IMedia[];
    setAvailableImages(imagesList);
  });

  useEffect(() => {
    fetchAvailableImages();
  }, []);

  const handleUpload = async (files: File[]): Promise<UploadResult[]> => {
    const successResults: UploadResult[] = [];
    
    // Upload sequentially to ensure unique file names
    for (const file of files) {
      const uploadResponse = await uploadImageAction(file, 'media');
      if (uploadResponse.success && uploadResponse.data) {
        successResults.push({
          url: uploadResponse.data,
          name: file.name
        });
      }
    }
    
    if (successResults.length === 0 && files.length > 0) {
      throw new Error("All files failed to upload.");
    }
    return successResults;
  }

  const handleSave = async (data: ICreateMedia[]): Promise<IMedia[]> => {
    const response = await createManyMediaAction(data);
    if (!response.success || !response.data) {
      throw new Error(response.error || "There was an error saving to the database");
    }
    return response.data as unknown as IMedia[];
  }

  const handleUploadSuccess = (media: IMedia[]) => {
    setAvailableImages(prev => [...prev, ...media]);
    notifications.show({
      title: 'Upload success',
      message: `Upload success ${media.length} images`,
      color: 'green',
    });
  }

  const handleUploadError = (error: Error) => {
    notifications.show({
      title: 'Upload failed',
      message: error.message || 'There was an error',
      color: 'red',
    });
  }
  return (
    <MediaModal
      opened={opened}
      onClose={onClose}
      images={availableImages}
      onSelect={(image) => onSelect(image.url)}
      onUpload={handleUpload}
      onSave={handleSave}
      onUploadSuccess={handleUploadSuccess}
      onUploadError={handleUploadError}
    />
  );
}

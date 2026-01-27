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
    const uploadPromises = files.map(async (file): Promise<UploadResult | null> => {
      const uploadResponse = await uploadImageAction(file, 'media');
      if (uploadResponse.success && uploadResponse.data) {
        return {
          url: uploadResponse.data,
          name: file.name
        };
      }
      return null;
    });
    const results = await Promise.all(uploadPromises);
    const successResults = results.filter((result): result is UploadResult => result !== null)
    if (successResults.length === 0 && files.length > 0) {
      throw new Error("Tất cả các file đều upload thất bại.");
    }
    return successResults;
  }

  const handleSave = async (data: ICreateMedia[]): Promise<IMedia[]> => {
    const response = await createManyMediaAction(data);
    if (!response.success || !response.data) {
      throw new Error(response.error || "Lỗi khi lưu vào cơ sở dữ liệu");
    }
    return response.data as unknown as IMedia[];
  }

  const handleUploadSuccess = (media: IMedia[]) => {
    setAvailableImages(prev => [...prev, ...media]);
    notifications.show({
      title: 'Upload thành công',
      message: `Đã upload thành công ${media.length} ảnh`,
      color: 'green',
    });
  }

  const handleUploadError = (error: Error) => {
    notifications.show({
      title: 'Upload thất bại',
      message: error.message || 'Đã có lỗi xảy ra',
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

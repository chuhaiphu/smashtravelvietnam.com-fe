'use server';

import { ActionResponse } from '@/interfaces/_base-interface';
import { executeApi } from '@/actions/_base';
import {
  uploadFileApi,
  uploadMultipleFilesApi,
  deleteUploadedFileApi,
} from '@/apis/upload-apis';

export async function uploadImageAction(
  file: File,
  folder: string
): Promise<ActionResponse<string>> {
  // Upload via backend API
  const result = await executeApi(
    async () => uploadFileApi(file, folder)
  );

  if (!result.success || !result.data) {
    return {
      success: false,
      error: result.error || 'Upload failed',
    };
  }
  return {
    success: true,
    data: result.data.url,
  };
}

export async function uploadMultipleImagesAction(
  files: File[],
  folder: string
): Promise<ActionResponse<string[]>> {

  const result = await executeApi(
    async () => uploadMultipleFilesApi(files, folder)
  );

  if (!result.success || !result.data) {
    return {
      success: false,
      error: result.error || 'Upload failed',
    };
  }
  // Extract URLs from response
  const urls = result.data.map(item => item.url);

  return {
    success: true,
    data: urls,
  };

}


export async function deleteLocalImageAction(
  relativePath: string
): Promise<ActionResponse<null>> {

  if (!relativePath) {
    return { success: false, error: 'Path is required' };
  }

  const result = await executeApi(
    async () => deleteUploadedFileApi(relativePath)
  );

  if (!result.success) {
    return {
      success: false,
      error: result.error || 'Delete failed',
    };
  }

  return {
    success: true,
    data: null,
  };
}


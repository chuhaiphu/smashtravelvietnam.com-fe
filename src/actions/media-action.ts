'use server';

import { ActionResponse } from '@/interfaces/_base-interface';
import { ICreateMedia, IMediaResponse, IUpdateMedia } from '@/interfaces/media-interface';
import { revalidatePath } from 'next/cache';
import { executeApi } from '@/actions/_base';
import {
  createMediaApi,
  getAllMediaApi,
  getMediaByIdApi,
  updateMediaApi,
  deleteMediaApi,
} from '@/apis/media-apis';

export async function createMediaAction(
  input: ICreateMedia
): Promise<ActionResponse<IMediaResponse>> {
  const result = await executeApi(
    async () => createMediaApi(input)
  );
  revalidatePath('/adminup/media');
  return result;
}

export async function createManyMediaAction(
  input: ICreateMedia[]
): Promise<ActionResponse<IMediaResponse[]>> {
  try {
    const results: IMediaResponse[] = [];
    for (const mediaInput of input) {
      const result = await executeApi(
        async () => createMediaApi(mediaInput)
      );
      if (result.success && result.data) {
        results.push(result.data);
      }
    }
    revalidatePath('/adminup/media');
    return { success: true, data: results };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create media'
    };
  }
}

export async function getMediaByIdAction(
  id: string
): Promise<ActionResponse<IMediaResponse>> {
  return executeApi(
    async () => getMediaByIdApi(id)
  );
}

export async function getAllMediaAction(): Promise<ActionResponse<IMediaResponse[]>> {
  return executeApi(
    async () => getAllMediaApi()
  );
}

export async function updateMediaAction(
  id: string,
  input: IUpdateMedia
): Promise<ActionResponse<IMediaResponse>> {
  const result = await executeApi(
    async () => updateMediaApi(id, input)
  );
  revalidatePath('/adminup/media');
  return result;
}

export async function deleteMediaAction(
  id: string
): Promise<ActionResponse<{ url: string } | null>> {
  // First get the media to have its URL
  const mediaResult = await executeApi(
    async () => getMediaByIdApi(id)
  );

  const result = await executeApi(
    async () => deleteMediaApi(id)
  );

  if (result.success && mediaResult.success && mediaResult.data) {
    const { deleteLocalImageAction } = await import('@/actions/upload-action');
    const urlObj = new URL(mediaResult.data.url);
    const pathParts = urlObj.pathname.split('/');
    let domainIndex = -1;
    if (process.env.NODE_ENV === 'development') {
      domainIndex = pathParts.findIndex(part => part === 'media');
    }
    else {
      domainIndex = pathParts.findIndex(part => part === process.env.SMASH_API_URL);
    }
    const relativePath = pathParts.slice(domainIndex + 1).join('/');
    console.log(relativePath)
    if (relativePath) {
      deleteLocalImageAction(relativePath);
    }
    revalidatePath('/adminup/media');
    revalidatePath('/adminup/media/images');
    return { success: true, data: { url: mediaResult.data.url } };
  }

  revalidatePath('/adminup/media');
  revalidatePath('/adminup/media/images');
  return { success: result.success, data: null, error: result.error };
}

export async function upsertMediaAction(
  input: ICreateMedia
): Promise<ActionResponse<IMediaResponse>> {
  // Check if media with same URL exists, update or create
  const allMedia = await executeApi(
    async () => getAllMediaApi()
  );

  if (allMedia.success && allMedia.data) {
    const existing = allMedia.data.find(m => m.url === input.url);
    if (existing) {
      return updateMediaAction(existing.id, {
        name: input.name,
        title: input.title,
        description: input.description,
        folder: input.folder,
      });
    }
  }

  return createMediaAction(input);
}

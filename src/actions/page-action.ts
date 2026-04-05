'use server';

import { updateTag, cacheLife, cacheTag } from 'next/cache';
import { ActionResponse } from '@/interfaces/_base-interface';
import { ICreatePage, IPageResponse, IUpdatePage } from '@/interfaces/page-interface';
import { executeApi } from '@/actions/_base';
import {
  createPageApi,
  getPageByIdApi,
  getPageByEndpointApi,
  getAllPagesAdminApi,
  updatePageApi,
  deletePageApi,
} from '@/apis/page-apis';

export async function createPageAction(
  input: ICreatePage
): Promise<ActionResponse<IPageResponse>> {
  const result = await executeApi(
    async () => createPageApi(input)
  );
  if (result.success) {
    updateTag('pages');
  }
  return result;
}

export async function getPageByIdAction(
  id: string
): Promise<ActionResponse<IPageResponse>> {
  return executeApi(
    async () => getPageByIdApi(id)
  );
}

export async function getPageByEndpointAction(
  endpoint: string
): Promise<ActionResponse<IPageResponse>> {
  'use cache';
  cacheLife('hours');
  cacheTag('pages', `page:${endpoint}`);
  return executeApi(
    async () => getPageByEndpointApi(endpoint)
  );
}

export async function getAllPagesAction(): Promise<ActionResponse<IPageResponse[]>> {
  return executeApi(
    async () => getAllPagesAdminApi()
  );
}

export async function getAllPublicPagesAction(): Promise<ActionResponse<IPageResponse[]>> {
  // Note: This may need a backend filter endpoint
  const result = await executeApi(
    async () => getAllPagesAdminApi()
  );
  if (result.success && result.data) {
    return {
      success: true,
      data: result.data.filter(page => page.visibility === 'PUBLIC'),
    };
  }
  return result;
}

export async function updatePageAction(
  id: string,
  input: IUpdatePage
): Promise<ActionResponse<IPageResponse>> {
  const result = await executeApi(
    async () => updatePageApi(id, input)
  );
  if (result.success) {
    updateTag('pages');
    if (input.endpoint) {
      updateTag(`page:${input.endpoint}`);
    }
  }
  return result;
}

export async function deletePageAction(
  id: string
): Promise<ActionResponse<void>> {
  const result = await executeApi(
    async () => deletePageApi(id)
  );
  if (result.success) {
    updateTag('pages');
  }
  return result;
}

'use server';

import { updateTag, cacheLife, cacheTag } from 'next/cache';
import { ActionResponse } from '@/interfaces/_base-interface';
import { ICreateBlogCategory, IBlogCategoryResponse, IUpdateBlogCategory } from '@/interfaces/blog-category-interface';
import { executeApi } from '@/actions/_base';
import {
  createBlogCategoryApi,
  getBlogCategoryByIdApi,
  getBlogCategoryByEndpointApi,
  getAllBlogCategoriesAdminApi,
  getAvailableSortOrdersApi,
  updateBlogCategoryApi,
  deleteBlogCategoryApi,
} from '@/apis/blog-category-apis';

export async function createBlogCategoryAction(
  input: ICreateBlogCategory
): Promise<ActionResponse<IBlogCategoryResponse>> {
  const result = await executeApi(
    async () => createBlogCategoryApi(input)
  );
  if (result.success) {
    updateTag('blog-categories');
  }
  return result;
}

export async function getBlogCategoryByIdAction(
  id: string
): Promise<ActionResponse<IBlogCategoryResponse>> {
  return executeApi(
    async () => getBlogCategoryByIdApi(id)
  );
}

export async function getBlogCategoryByEndpointAction(
  endpoint: string
): Promise<ActionResponse<IBlogCategoryResponse>> {
  'use cache';
  cacheLife('hours');
  cacheTag('blog-categories', `blog-category:${endpoint}`);
  return executeApi(
    async () => getBlogCategoryByEndpointApi(endpoint)
  );
}

export async function getAllBlogCategoriesAction(): Promise<ActionResponse<IBlogCategoryResponse[]>> {
  return executeApi(
    async () => getAllBlogCategoriesAdminApi()
  );
}

export async function getAvailableSortOrdersAction(
  parentId: string
): Promise<ActionResponse<number[]>> {
  return executeApi(
    async () => getAvailableSortOrdersApi(parentId)
  );
}

export async function updateBlogCategoryAction(
  id: string,
  input: IUpdateBlogCategory
): Promise<ActionResponse<IBlogCategoryResponse>> {
  const result = await executeApi(
    async () => updateBlogCategoryApi(id, input)
  );
  if (result.success) {
    updateTag('blog-categories');
    if (input.endpoint) {
      updateTag(`blog-category:${input.endpoint}`);
    }
  }
  return result;
}

export async function deleteBlogCategoryAction(
  id: string
): Promise<ActionResponse<void>> {
  const result = await executeApi(
    async () => deleteBlogCategoryApi(id)
  );
  if (result.success) {
    updateTag('blog-categories');
  }
  return result;
}

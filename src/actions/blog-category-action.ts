'use server';

import { ActionResponse } from '@/interfaces/_base-interface';
import { ICreateBlogCategory, IBlogCategoryResponse, IUpdateBlogCategory } from '@/interfaces/blog-category-interface';
import { revalidatePath } from 'next/cache';
import { executeApi } from '@/actions/_base';
import {
  createBlogCategoryApi,
  getBlogCategoryByIdApi,
  getBlogCategoryByEndpointApi,
  getAllBlogCategoriesAdminApi,
  updateBlogCategoryApi,
  deleteBlogCategoryApi,
} from '@/apis/blog-category-apis';

export async function createBlogCategoryAction(
  input: ICreateBlogCategory
): Promise<ActionResponse<IBlogCategoryResponse>> {
  const result = await executeApi(
    async () => createBlogCategoryApi(input)
  );
  revalidatePath('/', 'layout');
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
  // Note: This functionality may need to be added to the backend
  // For now, return a default range
  const result = await executeApi(
    async () => getAllBlogCategoriesAdminApi()
  );
  if (result.success && result.data) {
    const siblingCategories = result.data.filter(cat => cat.parent?.id === parentId);
    const usedOrders = siblingCategories.map(cat => cat.sortOrder);
    const availableOrders: number[] = [];
    for (let i = 1; i <= 100; i++) {
      if (!usedOrders.includes(i)) {
        availableOrders.push(i);
      }
    }
    return { success: true, data: availableOrders };
  }
  return { success: true, data: Array.from({ length: 100 }, (_, i) => i + 1) };
}

export async function updateBlogCategoryAction(
  id: string,
  input: IUpdateBlogCategory
): Promise<ActionResponse<IBlogCategoryResponse>> {
  const result = await executeApi(
    async () => updateBlogCategoryApi(id, input)
  );
  revalidatePath('/', 'layout');
  return result;
}

export async function deleteBlogCategoryAction(
  id: string
): Promise<ActionResponse<void>> {
  const result = await executeApi(
    async () => deleteBlogCategoryApi(id)
  );
  revalidatePath('/', 'layout');
  return result;
}

'use server';

import { ActionResponse } from '@/interfaces/_base-interface';
import { ICreateTourCategory, ITourCategoryResponse, IUpdateTourCategory } from '@/interfaces/tour-category-interface';
import { revalidatePath } from 'next/cache';
import { executeApi } from '@/actions/_base';
import {
  createTourCategoryApi,
  getTourCategoryByIdApi,
  getTourCategoryByEndpointApi,
  getAllTourCategoriesAdminApi,
  updateTourCategoryApi,
  deleteTourCategoryApi,
} from '@/apis/tour-category-apis';

export async function createTourCategoryAction(
  input: ICreateTourCategory
): Promise<ActionResponse<ITourCategoryResponse>> {
  const result = await executeApi(
    async () => createTourCategoryApi(input)
  );
  revalidatePath('/', 'layout');
  return result;
}

export async function getTourCategoryByIdAction(
  id: string
): Promise<ActionResponse<ITourCategoryResponse>> {
  return executeApi(
    async () => getTourCategoryByIdApi(id)
  );
}

export async function getTourCategoryByEndpointAction(
  endpoint: string
): Promise<ActionResponse<ITourCategoryResponse>> {
  return executeApi(
    async () => getTourCategoryByEndpointApi(endpoint)
  );
}

export async function getAllTourCategoriesAction(): Promise<ActionResponse<ITourCategoryResponse[]>> {
  return executeApi(
    async () => getAllTourCategoriesAdminApi()
  );
}

export async function getAvailableSortOrdersAction(
  parentId: string
): Promise<ActionResponse<number[]>> {
  // Note: This functionality may need to be added to the backend
  // For now, calculate from existing categories
  const result = await executeApi(
    async () => getAllTourCategoriesAdminApi()
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

export async function updateTourCategoryAction(
  id: string,
  input: IUpdateTourCategory
): Promise<ActionResponse<ITourCategoryResponse>> {
  const result = await executeApi(
    async () => updateTourCategoryApi(id, input)
  );
  revalidatePath('/', 'layout');
  return result;
}

export async function deleteTourCategoryAction(
  id: string
): Promise<ActionResponse<void>> {
  const result = await executeApi(
    async () => deleteTourCategoryApi(id)
  );
  revalidatePath('/', 'layout');
  return result;
}

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
  getAllPublicTourCategoriesApi,
  getAvailableSortOrdersApi,
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

export async function getAllTourCategoriesPublicAction(): Promise<ActionResponse<ITourCategoryResponse[]>> {
  return executeApi(
    async () => getAllPublicTourCategoriesApi()
  );
}

export async function getAvailableSortOrdersAction(
  parentId: string
): Promise<ActionResponse<number[]>> {
  return executeApi(
    async () => getAvailableSortOrdersApi(parentId)
  );
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

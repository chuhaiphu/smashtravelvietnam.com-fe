'use server';

import { ActionResponse } from '@/interfaces/_base-interface';
import {
  ICreateTourCategoryTour,
  ITourCategoryTourResponse,
  IUpdateTourCategoryTour
} from '@/interfaces/tour-category-tour-interface';
import { revalidatePath } from 'next/cache';
import { executeApi } from '@/actions/_base';
import {
  createTourCategoryTourApi,
  getTourCategoryTourByIdApi,
  getTourCategoryToursByTourIdApi,
  getTourCategoryToursByTourCategoryIdApi,
  getAllTourCategoryToursApi,
  updateTourCategoryTourApi,
  deleteTourCategoryTourApi,
  deleteTourCategoryToursByTourIdApi,
  deleteTourCategoryToursByTourCategoryIdApi,
} from '@/apis/tour-category-tour-apis';

export async function createTourCategoryTourAction(
  input: ICreateTourCategoryTour
): Promise<ActionResponse<ITourCategoryTourResponse>> {
  const result = await executeApi(
    async () => createTourCategoryTourApi(input)
  );
  revalidatePath('/', 'layout');
  return result;
}

export async function getTourCategoryTourByIdAction(
  id: string
): Promise<ActionResponse<ITourCategoryTourResponse>> {
  return executeApi(
    async () => getTourCategoryTourByIdApi(id)
  );
}

export async function getTourCategoryToursByTourIdAction(
  tourId: string
): Promise<ActionResponse<ITourCategoryTourResponse[]>> {
  return executeApi(
    async () => getTourCategoryToursByTourIdApi(tourId)
  );
}

export async function getTourCategoryToursByTourCategoryIdAction(
  tourCategoryId: string
): Promise<ActionResponse<ITourCategoryTourResponse[]>> {
  return executeApi(
    async () => getTourCategoryToursByTourCategoryIdApi(tourCategoryId)
  );
}

export async function getAllTourCategoryToursAction(): Promise<ActionResponse<ITourCategoryTourResponse[]>> {
  return executeApi(
    async () => getAllTourCategoryToursApi()
  );
}

export async function updateTourCategoryTourAction(
  id: string,
  input: IUpdateTourCategoryTour
): Promise<ActionResponse<ITourCategoryTourResponse>> {
  const result = await executeApi(
    async () => updateTourCategoryTourApi(id, input)
  );
  revalidatePath('/', 'layout');
  return result;
}

export async function deleteTourCategoryTourAction(
  id: string
): Promise<ActionResponse<void>> {
  const result = await executeApi(
    async () => deleteTourCategoryTourApi(id)
  );
  revalidatePath('/', 'layout');
  return result;
}

export async function deleteTourCategoryToursByTourIdAction(
  tourId: string
): Promise<ActionResponse<void>> {
  const result = await executeApi(
    async () => deleteTourCategoryToursByTourIdApi(tourId)
  );
  revalidatePath('/', 'layout');
  return result;
}

export async function deleteTourCategoryToursByTourCategoryIdAction(
  tourCategoryId: string
): Promise<ActionResponse<void>> {
  const result = await executeApi(
    async () => deleteTourCategoryToursByTourCategoryIdApi(tourCategoryId)
  );
  revalidatePath('/', 'layout');
  return result;
}

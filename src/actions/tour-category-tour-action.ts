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
  createTourCategoryTourApiPrivate,
  getTourCategoryTourByIdApiPublic,
  getTourCategoryToursByTourIdApiPublic,
  getTourCategoryToursByTourCategoryIdApiPublic,
  getAllTourCategoryToursApiPublic,
  updateTourCategoryTourApiPrivate,
  deleteTourCategoryTourApiPrivate,
  deleteTourCategoryToursByTourIdApiPrivate,
  deleteTourCategoryToursByTourCategoryIdApiPrivate,
} from '@/apis/tour-category-tour-apis';

export async function createTourCategoryTourActionPrivate(
  input: ICreateTourCategoryTour
): Promise<ActionResponse<ITourCategoryTourResponse>> {
  const result = await executeApi(
    async () => createTourCategoryTourApiPrivate(input)
  );
  revalidatePath('/', 'layout');
  return result;
}

export async function getTourCategoryTourByIdActionPublic(
  id: string
): Promise<ActionResponse<ITourCategoryTourResponse>> {
  return executeApi(
    async () => getTourCategoryTourByIdApiPublic(id)
  );
}

export async function getTourCategoryToursByTourIdActionPublic(
  tourId: string
): Promise<ActionResponse<ITourCategoryTourResponse[]>> {
  return executeApi(
    async () => getTourCategoryToursByTourIdApiPublic(tourId)
  );
}

export async function getTourCategoryToursByTourCategoryIdActionPublic(
  tourCategoryId: string
): Promise<ActionResponse<ITourCategoryTourResponse[]>> {
  return executeApi(
    async () => getTourCategoryToursByTourCategoryIdApiPublic(tourCategoryId)
  );
}

export async function getAllTourCategoryToursActionPublic(): Promise<ActionResponse<ITourCategoryTourResponse[]>> {
  return executeApi(
    async () => getAllTourCategoryToursApiPublic()
  );
}

export async function updateTourCategoryTourActionPrivate(
  id: string,
  input: IUpdateTourCategoryTour
): Promise<ActionResponse<ITourCategoryTourResponse>> {
  const result = await executeApi(
    async () => updateTourCategoryTourApiPrivate(id, input)
  );
  revalidatePath('/', 'layout');
  return result;
}

export async function deleteTourCategoryTourActionPrivate(
  id: string
): Promise<ActionResponse<void>> {
  const result = await executeApi(
    async () => deleteTourCategoryTourApiPrivate(id)
  );
  revalidatePath('/', 'layout');
  return result;
}

export async function deleteTourCategoryToursByTourIdActionPrivate(
  tourId: string
): Promise<ActionResponse<void>> {
  const result = await executeApi(
    async () => deleteTourCategoryToursByTourIdApiPrivate(tourId)
  );
  revalidatePath('/', 'layout');
  return result;
}

export async function deleteTourCategoryToursByTourCategoryIdActionPrivate(
  tourCategoryId: string
): Promise<ActionResponse<void>> {
  const result = await executeApi(
    async () => deleteTourCategoryToursByTourCategoryIdApiPrivate(tourCategoryId)
  );
  revalidatePath('/', 'layout');
  return result;
}

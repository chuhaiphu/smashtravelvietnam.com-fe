'use server';

import { ActionResponse } from '@/interfaces/_base-interface';
import {
  ICreateTourCategoryCustomTourRequest,
  ITourCategoryCustomTourRequestResponse,
} from '@/interfaces/tour-category-custom-tour-request-interface';
import { revalidatePath } from 'next/cache';
import { executeApi } from '@/actions/_base';
import {
  createTourCategoryCustomTourRequestApi,
  getTourCategoryCustomTourRequestByIdApi,
  getTourCategoryCustomTourRequestsByCustomTourRequestIdApi,
  getTourCategoryCustomTourRequestsByTourCategoryIdApi,
  getAllTourCategoryCustomTourRequestsApi,
  deleteTourCategoryCustomTourRequestApi,
  deleteTourCategoryCustomTourRequestsByCustomTourRequestIdApi,
  deleteTourCategoryCustomTourRequestsByTourCategoryIdApi,
} from '@/apis/tour-category-custom-tour-request-apis';

export async function createTourCategoryCustomTourRequestAction(
  input: ICreateTourCategoryCustomTourRequest
): Promise<ActionResponse<ITourCategoryCustomTourRequestResponse>> {
  const result = await executeApi(
    async () => createTourCategoryCustomTourRequestApi(input)
  );
  revalidatePath('/', 'layout');
  return result;
}

export async function getTourCategoryCustomTourRequestByIdAction(
  id: string
): Promise<ActionResponse<ITourCategoryCustomTourRequestResponse>> {
  return executeApi(
    async () => getTourCategoryCustomTourRequestByIdApi(id)
  );
}

export async function getTourCategoryCustomTourRequestsByCustomTourRequestIdAction(
  customTourRequestId: string
): Promise<ActionResponse<ITourCategoryCustomTourRequestResponse[]>> {
  return executeApi(
    async () => getTourCategoryCustomTourRequestsByCustomTourRequestIdApi(customTourRequestId)
  );
}

export async function getTourCategoryCustomTourRequestsByTourCategoryIdAction(
  tourCategoryId: string
): Promise<ActionResponse<ITourCategoryCustomTourRequestResponse[]>> {
  return executeApi(
    async () => getTourCategoryCustomTourRequestsByTourCategoryIdApi(tourCategoryId)
  );
}

export async function getAllTourCategoryCustomTourRequestsAction(): Promise<ActionResponse<ITourCategoryCustomTourRequestResponse[]>> {
  return executeApi(
    async () => getAllTourCategoryCustomTourRequestsApi()
  );
}

export async function deleteTourCategoryCustomTourRequestAction(
  id: string
): Promise<ActionResponse<void>> {
  const result = await executeApi(
    async () => deleteTourCategoryCustomTourRequestApi(id)
  );
  revalidatePath('/', 'layout');
  return result;
}

export async function deleteTourCategoryCustomTourRequestsByCustomTourRequestIdAction(
  customTourRequestId: string
): Promise<ActionResponse<void>> {
  const result = await executeApi(
    async () => deleteTourCategoryCustomTourRequestsByCustomTourRequestIdApi(customTourRequestId)
  );
  revalidatePath('/', 'layout');
  return result;
}

export async function deleteTourCategoryCustomTourRequestsByTourCategoryIdAction(
  tourCategoryId: string
): Promise<ActionResponse<void>> {
  const result = await executeApi(
    async () => deleteTourCategoryCustomTourRequestsByTourCategoryIdApi(tourCategoryId)
  );
  revalidatePath('/', 'layout');
  return result;
}

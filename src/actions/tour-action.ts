'use server';

import { updateTag, cacheLife, cacheTag } from 'next/cache';
import { ActionResponse } from '@/interfaces/_base-interface';
import { ICreateTour, ITourResponse, IUpdateTour } from '@/interfaces/tour-interface';
import { executeApi } from '@/actions/_base';
import {
  createTourApi,
  getTourByIdApi,
  getTourByEndpointApi,
  getAllToursAdminApi,
  getAllPublicToursApi,
  updateTourApi,
  deleteTourApi,
  incrementTourViewApi,
  toggleTourLikeApi,
} from '@/apis/tour-apis';

export async function createTourAction(
  input: ICreateTour
): Promise<ActionResponse<ITourResponse>> {
  const result = await executeApi(
    async () => createTourApi(input)
  );
  if (result.success) {
    updateTag('tours');
  }
  return result;
}

export async function getTourByIdAction(
  id: string
): Promise<ActionResponse<ITourResponse>> {
  return executeApi(
    async () => getTourByIdApi(id)
  );
}

export async function getTourByEndpointAction(
  endpoint: string
): Promise<ActionResponse<ITourResponse>> {
  'use cache';
  cacheLife('hours');
  cacheTag('tours', `tour:${endpoint}`);
  return executeApi(
    async () => getTourByEndpointApi(endpoint)
  );
}

export async function getAllToursAction(): Promise<ActionResponse<ITourResponse[]>> {
  return executeApi(
    async () => getAllToursAdminApi()
  );
}

export async function getAllPublicToursAction(): Promise<ActionResponse<ITourResponse[]>> {
  'use cache';
  cacheLife('hours');
  cacheTag('tours');
  return executeApi(
    async () => getAllPublicToursApi({ visibility: 'PUBLIC' })
  );
}

export async function getAllPublicToursPinnedToHomeAction(): Promise<ActionResponse<ITourResponse[]>> {
  'use cache';
  cacheLife('hours');
  cacheTag('tours');
  return executeApi(
    async () => getAllPublicToursApi({ visibility: 'PUBLIC', pinnedToHome: true })
  );
}

export async function updateTourAction(
  id: string,
  input: IUpdateTour
): Promise<ActionResponse<ITourResponse>> {
  const result = await executeApi(
    async () => updateTourApi(id, input)
  );
  if (result.success) {
    updateTag('tours');
    if (input.endpoint) {
      updateTag(`tour:${input.endpoint}`);
    }
  }
  return result;
}

export async function deleteTourAction(
  id: string
): Promise<ActionResponse<void>> {
  const result = await executeApi(
    async () => deleteTourApi(id)
  );
  if (result.success) {
    updateTag('tours');
  }
  return result;
}

export async function incrementTourViewAction(
  tourId: string
): Promise<ActionResponse<boolean>> {
  const result = await executeApi(
    async () => incrementTourViewApi(tourId)
  );
  return {
    success: result.success,
    data: result.data?.recorded ?? false,
    error: result.error,
  };
}

export async function incrementTourLikeAction(
  tourId: string
): Promise<ActionResponse<boolean>> {
  const result = await executeApi(
    async () => toggleTourLikeApi(tourId)
  );
  return {
    success: result.success,
    data: result.data?.liked ?? false,
    error: result.error,
  };
}

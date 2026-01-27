import { ICreateTour, ITourResponse, IUpdateTour } from "@/interfaces/tour-interface";
import { api } from "./_base";

export interface TourFilterParams {
  visibility?: string;
  pinnedToHome?: boolean;
}

function buildQueryString(filter?: TourFilterParams): string {
  if (!filter) return '';
  const params = new URLSearchParams();
  if (filter.visibility) params.append('visibility', filter.visibility);
  if (filter.pinnedToHome !== undefined) params.append('pinnedToHome', String(filter.pinnedToHome));
  const query = params.toString();
  return query ? `?${query}` : '';
}

// ==================== PUBLIC ROUTES ====================

export async function getAllPublicToursApi(filter?: TourFilterParams) {
  const queryString = buildQueryString(filter);
  return api<ITourResponse[]>(`/tours${queryString}`, {
    method: 'GET',
  });
}

export async function getTourByEndpointApi(endpoint: string) {
  return api<ITourResponse>(`/tours/${endpoint}`, {
    method: 'GET',
  });
}

export async function incrementTourViewApi(id: string) {
  return api<{ recorded: boolean }>(`/tours/${id}/view`, {
    method: 'POST',
  });
}

export async function toggleTourLikeApi(id: string) {
  return api<{ liked: boolean }>(`/tours/${id}/like`, {
    method: 'POST',
  });
}

// ==================== ADMIN ROUTES ====================

export async function createTourApi(data: ICreateTour) {
  return api<ITourResponse>('/tours/admin', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getAllToursAdminApi(filter?: TourFilterParams) {
  const queryString = buildQueryString(filter);
  return api<ITourResponse[]>(`/tours/admin/list${queryString}`, {
    method: 'GET',
  });
}

export async function getTourByIdApi(id: string) {
  return api<ITourResponse>(`/tours/admin/${id}`, {
    method: 'GET',
  });
}

export async function updateTourApi(id: string, data: IUpdateTour) {
  return api<ITourResponse>(`/tours/admin/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteTourApi(id: string) {
  return api<void>(`/tours/admin/${id}`, {
    method: 'DELETE',
  });
}

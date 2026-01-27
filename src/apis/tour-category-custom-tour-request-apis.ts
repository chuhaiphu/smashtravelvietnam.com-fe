import {
  ICreateTourCategoryCustomTourRequest,
  ITourCategoryCustomTourRequestResponse
} from "@/interfaces/tour-category-custom-tour-request-interface";
import { api } from "./_base";

// Note: These endpoints need to be implemented in the backend

export async function createTourCategoryCustomTourRequestApi(data: ICreateTourCategoryCustomTourRequest) {
  return api<ITourCategoryCustomTourRequestResponse>('/admin/tour-category-custom-tour-requests', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getTourCategoryCustomTourRequestByIdApi(id: string) {
  return api<ITourCategoryCustomTourRequestResponse>(`/admin/tour-category-custom-tour-requests/${id}`, {
    method: 'GET',
  });
}

export async function getTourCategoryCustomTourRequestsByCustomTourRequestIdApi(customTourRequestId: string) {
  return api<ITourCategoryCustomTourRequestResponse[]>(`/admin/tour-category-custom-tour-requests/request/${customTourRequestId}`, {
    method: 'GET',
  });
}

export async function getTourCategoryCustomTourRequestsByTourCategoryIdApi(tourCategoryId: string) {
  return api<ITourCategoryCustomTourRequestResponse[]>(`/admin/tour-category-custom-tour-requests/category/${tourCategoryId}`, {
    method: 'GET',
  });
}

export async function getAllTourCategoryCustomTourRequestsApi() {
  return api<ITourCategoryCustomTourRequestResponse[]>('/admin/tour-category-custom-tour-requests', {
    method: 'GET',
  });
}

export async function deleteTourCategoryCustomTourRequestApi(id: string) {
  return api<void>(`/admin/tour-category-custom-tour-requests/${id}`, {
    method: 'DELETE',
  });
}

export async function deleteTourCategoryCustomTourRequestsByCustomTourRequestIdApi(customTourRequestId: string) {
  return api<void>(`/admin/tour-category-custom-tour-requests/request/${customTourRequestId}`, {
    method: 'DELETE',
  });
}

export async function deleteTourCategoryCustomTourRequestsByTourCategoryIdApi(tourCategoryId: string) {
  return api<void>(`/admin/tour-category-custom-tour-requests/category/${tourCategoryId}`, {
    method: 'DELETE',
  });
}

import {
  ICreateTourCategoryTour,
  ITourCategoryTourResponse,
  IUpdateTourCategoryTour
} from "@/interfaces/tour-category-tour-interface";
import { api } from "./_base";

// Public GET (no auth)
export async function getAllTourCategoryToursApi() {
  return api<ITourCategoryTourResponse[]>('/tour-category-tours', { method: 'GET' });
}

export async function getTourCategoryTourByIdApi(id: string) {
  return api<ITourCategoryTourResponse>(`/tour-category-tours/${id}`, { method: 'GET' });
}

export async function getTourCategoryToursByTourIdApi(tourId: string) {
  return api<ITourCategoryTourResponse[]>(`/tour-category-tours/tour/${tourId}`, { method: 'GET' });
}

export async function getTourCategoryToursByTourCategoryIdApi(tourCategoryId: string) {
  return api<ITourCategoryTourResponse[]>(`/tour-category-tours/category/${tourCategoryId}`, { method: 'GET' });
}

// Admin (auth)
export async function createTourCategoryTourApi(data: ICreateTourCategoryTour) {
  return api<ITourCategoryTourResponse>('/tour-category-tours/admin', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateTourCategoryTourApi(id: string, data: IUpdateTourCategoryTour) {
  return api<ITourCategoryTourResponse>(`/tour-category-tours/admin/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteTourCategoryTourApi(id: string) {
  return api<void>(`/tour-category-tours/admin/${id}`, { method: 'DELETE' });
}

export async function deleteTourCategoryToursByTourIdApi(tourId: string) {
  return api<void>(`/tour-category-tours/admin/tour/${tourId}`, { method: 'DELETE' });
}

export async function deleteTourCategoryToursByTourCategoryIdApi(tourCategoryId: string) {
  return api<void>(`/tour-category-tours/admin/category/${tourCategoryId}`, { method: 'DELETE' });
}

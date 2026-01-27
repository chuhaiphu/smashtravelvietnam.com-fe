import { ICreateTourCategory, ITourCategoryResponse, IUpdateTourCategory } from "@/interfaces/tour-category-interface";
import { api } from "./_base";

// ==================== PUBLIC ROUTES ====================

export async function getAllPublicTourCategoriesApi() {
  return api<ITourCategoryResponse[]>('/tour-categories', {
    method: 'GET',
  });
}

export async function getTourCategoryByEndpointApi(endpoint: string) {
  return api<ITourCategoryResponse>(`/tour-categories/${endpoint}`, {
    method: 'GET',
  });
}

// ==================== ADMIN ROUTES ====================

export async function createTourCategoryApi(data: ICreateTourCategory) {
  return api<ITourCategoryResponse>('/tour-categories/admin', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getAllTourCategoriesAdminApi() {
  return api<ITourCategoryResponse[]>('/tour-categories/admin/list', {
    method: 'GET',
  });
}

export async function getAvailableSortOrdersApi(parentId: string) {
  return api<number[]>(`/tour-categories/admin/available-sort-orders/${parentId}`, {
    method: 'GET',
  });
}

export async function getTourCategoryByIdApi(id: string) {
  return api<ITourCategoryResponse>(`/tour-categories/admin/${id}`, {
    method: 'GET',
  });
}

export async function updateTourCategoryApi(id: string, data: IUpdateTourCategory) {
  return api<ITourCategoryResponse>(`/tour-categories/admin/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteTourCategoryApi(id: string) {
  return api<void>(`/tour-categories/admin/${id}`, {
    method: 'DELETE',
  });
}

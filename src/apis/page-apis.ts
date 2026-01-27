import { ICreatePage, IPageResponse, IUpdatePage } from "@/interfaces/page-interface";
import { api } from "./_base";

// ==================== PUBLIC ROUTES ====================

export async function getPageByEndpointApi(endpoint: string) {
  return api<IPageResponse>(`/pages/${endpoint}`, {
    method: 'GET',
  });
}

// ==================== ADMIN ROUTES ====================

export async function createPageApi(data: ICreatePage) {
  return api<IPageResponse>('/pages/admin', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getAllPagesAdminApi() {
  return api<IPageResponse[]>('/pages/admin/list', {
    method: 'GET',
  });
}

export async function getPageByIdApi(id: string) {
  return api<IPageResponse>(`/pages/admin/${id}`, {
    method: 'GET',
  });
}

export async function updatePageApi(id: string, data: IUpdatePage) {
  return api<IPageResponse>(`/pages/admin/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deletePageApi(id: string) {
  return api<void>(`/pages/admin/${id}`, {
    method: 'DELETE',
  });
}

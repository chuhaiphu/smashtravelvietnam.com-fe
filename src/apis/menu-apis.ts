import { ICreateMenu, IMenuResponse, IUpdateMenu } from "@/interfaces/menu-interface";
import { api } from "./_base";

// ==================== PUBLIC ROUTES ====================

export async function getRootMenusApi() {
  return api<IMenuResponse[]>('/menus', {
    method: 'GET',
  });
}

// ==================== ADMIN ROUTES ====================

export async function createMenuApi(data: ICreateMenu) {
  return api<IMenuResponse>('/menus/admin', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getAllMenusAdminApi() {
  return api<IMenuResponse[]>('/menus/admin/list', {
    method: 'GET',
  });
}

export async function getAvailableSortOrdersApi(parentId: string) {
  return api<number[]>(`/menus/admin/available-sort-orders/${parentId}`, {
    method: 'GET',
  });
}

export async function getMenuByIdApi(id: string) {
  return api<IMenuResponse>(`/menus/admin/${id}`, {
    method: 'GET',
  });
}

export async function updateMenuApi(id: string, data: IUpdateMenu) {
  return api<IMenuResponse>(`/menus/admin/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteMenuApi(id: string) {
  return api<void>(`/menus/admin/${id}`, {
    method: 'DELETE',
  });
}

import { ICreateCustomTourRequest, ICustomTourRequestResponse } from "@/interfaces/custom-tour-request-interface";
import { api } from "./_base";

// ==================== PUBLIC ROUTES ====================

export async function createCustomTourRequestApi(data: ICreateCustomTourRequest) {
  return api<ICustomTourRequestResponse>('/custom-tour-requests', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ==================== ADMIN ROUTES ====================

export async function getAllCustomTourRequestsAdminApi() {
  return api<ICustomTourRequestResponse[]>(`/custom-tour-requests/admin/list`, {
    method: 'GET',
  });
}

export async function getCustomTourRequestByIdApi(id: string) {
  return api<ICustomTourRequestResponse>(`/custom-tour-requests/admin/${id}`, {
    method: 'GET',
  });
}

export async function deleteCustomTourRequestApi(id: string) {
  return api<void>(`/custom-tour-requests/admin/${id}`, {
    method: 'DELETE',
  });
}

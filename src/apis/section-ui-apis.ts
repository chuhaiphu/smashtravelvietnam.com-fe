import {
  ICreateSectionUICredentials,
  ISectionUICredentialsResponse,
  IUpdateSectionUICredentials
} from "@/interfaces/section-ui-credentials-interface";
import {
  ICreateDynamicSectionUI,
  IDynamicSectionUIResponse,
  IUpdateDynamicSectionUI
} from "@/interfaces/dynamic-section-ui-interface";
import { api } from "./_base";

// ==================== SECTION UI CREDENTIALS ROUTES ====================

export async function createSectionUICredentialsApi(data: ICreateSectionUICredentials) {
  return api<ISectionUICredentialsResponse>('/admin/section-ui/credentials', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getAllSectionUICredentialsApi() {
  return api<ISectionUICredentialsResponse[]>('/admin/section-ui/credentials', {
    method: 'GET',
  });
}

export async function getDistinctSectionUICredentialsTypesApi() {
  return api<string[]>('/admin/section-ui/credentials/types/distinct', {
    method: 'GET',
  });
}

export async function getSectionUICredentialsByCodeApi(code: string) {
  return api<ISectionUICredentialsResponse>(`/admin/section-ui/credentials/code/${code}`, {
    method: 'GET',
  });
}

export async function getSectionUICredentialsByTypeApi(type: string) {
  return api<ISectionUICredentialsResponse[]>(`/admin/section-ui/credentials/type/${type}`, {
    method: 'GET',
  });
}

export async function getSectionUICredentialsByIdApi(id: string) {
  return api<ISectionUICredentialsResponse>(`/admin/section-ui/credentials/${id}`, {
    method: 'GET',
  });
}

export async function updateSectionUICredentialsApi(id: string, data: IUpdateSectionUICredentials) {
  return api<ISectionUICredentialsResponse>(`/admin/section-ui/credentials/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteSectionUICredentialsApi(id: string) {
  return api<void>(`/admin/section-ui/credentials/${id}`, {
    method: 'DELETE',
  });
}

// ==================== DYNAMIC SECTION UI ROUTES ====================

export async function createSectionUIApi(data: ICreateDynamicSectionUI) {
  return api<IDynamicSectionUIResponse>('/admin/section-ui/sections', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getAllSectionUIsApi() {
  return api<IDynamicSectionUIResponse[]>('/admin/section-ui/sections', {
    method: 'GET',
  });
}

export async function getUsedSectionUIPositionsApi() {
  return api<number[]>('/admin/section-ui/sections/positions/used', {
    method: 'GET',
  });
}

export async function getSectionUIByPositionApi(position: number) {
  return api<IDynamicSectionUIResponse>(`/admin/section-ui/sections/position/${position}`, {
    method: 'GET',
  });
}

export async function getSectionUIsByTypeApi(type: string) {
  return api<IDynamicSectionUIResponse[]>(`/admin/section-ui/sections/type/${type}`, {
    method: 'GET',
  });
}

export async function getSectionUIByIdApi(id: string) {
  return api<IDynamicSectionUIResponse>(`/admin/section-ui/sections/${id}`, {
    method: 'GET',
  });
}

export async function updateSectionUIApi(id: string, data: IUpdateDynamicSectionUI) {
  return api<IDynamicSectionUIResponse>(`/admin/section-ui/sections/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteSectionUIApi(id: string) {
  return api<void>(`/admin/section-ui/sections/${id}`, {
    method: 'DELETE',
  });
}

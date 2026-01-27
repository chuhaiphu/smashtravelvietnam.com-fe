'use server';

import { ActionResponse } from '@/interfaces/_base-interface';
import { ICreateSectionUICredentials, ISectionUICredentialsResponse, IUpdateSectionUICredentials } from '@/interfaces/section-ui-credentials-interface';
import { ICreateDynamicSectionUI, IDynamicSectionUIResponse, IUpdateDynamicSectionUI } from '@/interfaces/dynamic-section-ui-interface';
import { revalidatePath } from 'next/cache';
import { executeApi } from '@/actions/_base';
import {
  createSectionUICredentialsApi,
  getAllSectionUICredentialsApi,
  getDistinctSectionUICredentialsTypesApi,
  getSectionUICredentialsByCodeApi,
  getSectionUICredentialsByTypeApi,
  getSectionUICredentialsByIdApi,
  updateSectionUICredentialsApi,
  deleteSectionUICredentialsApi,
  createSectionUIApi,
  getAllSectionUIsApi,
  getUsedSectionUIPositionsApi,
  getSectionUIByPositionApi,
  getSectionUIsByTypeApi,
  getSectionUIByIdApi,
  updateSectionUIApi,
  deleteSectionUIApi,
} from '@/apis/section-ui-apis';

// ==================== SECTION UI CREDENTIALS ACTIONS ====================

export async function createSectionUICredentialsAction(
  input: ICreateSectionUICredentials
): Promise<ActionResponse<ISectionUICredentialsResponse>> {
  const result = await executeApi(
    async () => createSectionUICredentialsApi(input)
  );
  revalidatePath('/', 'layout');
  return result;
}

export async function getAllSectionUICredentialsAction(): Promise<ActionResponse<ISectionUICredentialsResponse[]>> {
  return executeApi(
    async () => getAllSectionUICredentialsApi()
  );
}

export async function getDistinctSectionUICredentialsTypesAction(): Promise<ActionResponse<string[]>> {
  return executeApi(
    async () => getDistinctSectionUICredentialsTypesApi()
  );
}

export async function getSectionUICredentialsByCodeAction(
  code: string
): Promise<ActionResponse<ISectionUICredentialsResponse>> {
  return executeApi(
    async () => getSectionUICredentialsByCodeApi(code)
  );
}

export async function getSectionUICredentialsByTypeAction(
  type: string
): Promise<ActionResponse<ISectionUICredentialsResponse[]>> {
  return executeApi(
    async () => getSectionUICredentialsByTypeApi(type)
  );
}

export async function getSectionUICredentialsByIdAction(
  id: string
): Promise<ActionResponse<ISectionUICredentialsResponse>> {
  return executeApi(
    async () => getSectionUICredentialsByIdApi(id)
  );
}

export async function updateSectionUICredentialsAction(
  id: string,
  input: IUpdateSectionUICredentials
): Promise<ActionResponse<ISectionUICredentialsResponse>> {
  const result = await executeApi(
    async () => updateSectionUICredentialsApi(id, input)
  );
  revalidatePath('/', 'layout');
  return result;
}

export async function deleteSectionUICredentialsAction(
  id: string
): Promise<ActionResponse<void>> {
  const result = await executeApi(
    async () => deleteSectionUICredentialsApi(id)
  );
  revalidatePath('/', 'layout');
  return result;
}

// ==================== DYNAMIC SECTION UI ACTIONS ====================

export async function createSectionUIAction(
  input: ICreateDynamicSectionUI
): Promise<ActionResponse<IDynamicSectionUIResponse>> {
  const result = await executeApi(
    async () => createSectionUIApi(input)
  );
  revalidatePath('/', 'layout');
  return result;
}

export async function getAllSectionUIsAction(): Promise<ActionResponse<IDynamicSectionUIResponse[]>> {
  return executeApi(
    async () => getAllSectionUIsApi()
  );
}

export async function getUsedSectionUIPositionsAction(): Promise<ActionResponse<number[]>> {
  return executeApi(
    async () => getUsedSectionUIPositionsApi()
  );
}

export async function getSectionUIByPositionAction(
  position: number
): Promise<ActionResponse<IDynamicSectionUIResponse>> {
  return executeApi(
    async () => getSectionUIByPositionApi(position)
  );
}

export async function getSectionUIsByTypeAction(
  type: string
): Promise<ActionResponse<IDynamicSectionUIResponse[]>> {
  return executeApi(
    async () => getSectionUIsByTypeApi(type)
  );
}

export async function getSectionUIByIdAction(
  id: string
): Promise<ActionResponse<IDynamicSectionUIResponse>> {
  return executeApi(
    async () => getSectionUIByIdApi(id)
  );
}

export async function updateSectionUIAction(
  id: string,
  input: IUpdateDynamicSectionUI
): Promise<ActionResponse<IDynamicSectionUIResponse>> {
  const result = await executeApi(
    async () => updateSectionUIApi(id, input)
  );
  revalidatePath('/', 'layout');
  return result;
}

export async function deleteSectionUIAction(
  id: string
): Promise<ActionResponse<void>> {
  const result = await executeApi(
    async () => deleteSectionUIApi(id)
  );
  revalidatePath('/', 'layout');
  return result;
}

'use server';

import { ActionResponse } from '@/interfaces/_base-interface';
import { ICreateMenu, IMenuResponse, IUpdateMenu } from '@/interfaces/menu-interface';
import { revalidatePath } from 'next/cache';
import { executeApi } from '@/actions/_base';
import {
  createMenuApi,
  getMenuByIdApi,
  getAllMenusAdminApi,
  getAvailableSortOrdersApi,
  updateMenuApi,
  deleteMenuApi,
} from '@/apis/menu-apis';

export async function createMenuAction(
  input: ICreateMenu
): Promise<ActionResponse<IMenuResponse>> {
  const result = await executeApi(
    async () => createMenuApi(input)
  );
  revalidatePath('/', 'layout');
  return result;
}

export async function getMenuByIdAction(
  id: string
): Promise<ActionResponse<IMenuResponse>> {
  return executeApi(
    async () => getMenuByIdApi(id)
  );
}

export async function getAllMenusAction(): Promise<ActionResponse<IMenuResponse[]>> {
  return executeApi(
    async () => getAllMenusAdminApi()
  );
}

export async function getAvailableSortOrdersAction(
  parentId: string
): Promise<ActionResponse<number[]>> {
  return executeApi(
    async () => getAvailableSortOrdersApi(parentId)
  );
}

export async function updateMenuAction(
  id: string,
  input: IUpdateMenu
): Promise<ActionResponse<IMenuResponse>> {
  const result = await executeApi(
    async () => updateMenuApi(id, input)
  );
  revalidatePath('/', 'layout');
  return result;
}

export async function deleteMenuAction(
  id: string
): Promise<ActionResponse<void>> {
  const result = await executeApi(
    async () => deleteMenuApi(id)
  );
  revalidatePath('/', 'layout');
  return result;
}

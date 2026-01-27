'use server';

import { ActionResponse } from '@/interfaces/_base-interface';
import { ICreateMenu, IMenuResponse, IUpdateMenu } from '@/interfaces/menu-interface';
import { revalidatePath } from 'next/cache';
import { executeApi } from '@/actions/_base';
import {
  createMenuApi,
  getMenuByIdApi,
  getAllMenusAdminApi,
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
  // Note: This functionality may need to be added to the backend
  // For now, calculate from existing menus
  const result = await executeApi(
    async () => getAllMenusAdminApi()
  );
  if (result.success && result.data) {
    const siblingMenus = result.data.filter(menu => menu.parent?.id === parentId);
    const usedOrders = siblingMenus.map(menu => menu.sortOrder);
    const availableOrders: number[] = [];
    for (let i = 1; i <= 100; i++) {
      if (!usedOrders.includes(i)) {
        availableOrders.push(i);
      }
    }
    return { success: true, data: availableOrders };
  }
  return { success: true, data: Array.from({ length: 100 }, (_, i) => i + 1) };
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

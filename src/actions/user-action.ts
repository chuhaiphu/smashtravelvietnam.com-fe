'use server';

import { ActionResponse } from '@/interfaces/_base-interface';
import { ICreateUser, IUpdatePassword, IUserResponse } from '@/interfaces/user-interface';
import { revalidatePath } from 'next/cache';
import { executeApi } from '@/actions/_base';
import {
  createUserApi,
  getUserByIdApi,
  updatePasswordApi,
  getAllUsersApi,
} from '@/apis/user-apis';

export async function createUserAction(
  input: ICreateUser
): Promise<ActionResponse<IUserResponse>> {
  const result = await executeApi(
    async () => createUserApi(input)
  );
  revalidatePath('/', 'layout');
  return result;
}

export async function getUserByIdAction(
  id: string
): Promise<IUserResponse | undefined> {
  const result = await executeApi(
    async () => getUserByIdApi(id)
  );
  return result.data;
}

export async function getAllUsersAction(): Promise<IUserResponse[] | undefined> {
  const result = await executeApi(
    async () => getAllUsersApi()
  );
  return result.data;
}

export async function updateUserPasswordAction(
  input: IUpdatePassword
): Promise<ActionResponse<IUserResponse>> {
  const result = await executeApi(
    async () => updatePasswordApi(input)
  );
  revalidatePath('/admin/user/[id]', 'page');
  return result;
}
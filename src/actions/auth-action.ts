'use server';

import { ActionResponse } from '@/interfaces/_base-interface';
import { IUserResponse } from '@/interfaces/user-interface';
import { executeApi } from '@/actions/_base';
import { localSignInApi, logoutApi, getMeApi, AuthRequest, AuthResponse, resetPasswordForUserApi, resetMyPasswordApi } from '@/apis/auth-apis';
import { revalidatePath } from 'next/cache';

export async function localSignInAction(
  credentials: AuthRequest
): Promise<ActionResponse<AuthResponse>> {
  const result = await executeApi(
    async () => localSignInApi(credentials)
  );
  if (result.success) {
    revalidatePath('/', 'layout');
  }
  return result;
}

export async function logoutAction(): Promise<ActionResponse<void>> {
  const result = await executeApi(
    async () => logoutApi()
  );
  if (result.success) {
    revalidatePath('/', 'layout');
  }
  return result;
}

export async function getMeAction(): Promise<ActionResponse<IUserResponse>> {
  return executeApi(
    async () => getMeApi()
  );
}

export async function resetPasswordForUserAction(
  targetUserId: string
): Promise<ActionResponse<void>> {
  return executeApi(
    async () => resetPasswordForUserApi(targetUserId)
  );
}

export async function resetMyPasswordAction(): Promise<ActionResponse<void>> {
  return executeApi(
    async () => resetMyPasswordApi()
  );
}

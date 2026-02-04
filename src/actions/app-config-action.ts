'use server';

import { revalidatePath } from 'next/cache';
import { ActionResponse } from '@/interfaces/_base-interface';
import { IAppConfigResponse, IUpdateAppConfig } from '@/interfaces/app-config-interface';
import { executeApi } from '@/actions/_base';
import {
  getPublicAppConfigApi,
  updateAppConfigApi,
} from '@/apis/app-config-apis';

export async function getAppConfigAction(): Promise<ActionResponse<IAppConfigResponse>> {
  return executeApi(
    async () => getPublicAppConfigApi()
  );
}

export async function updateAppConfigAction(
  input: IUpdateAppConfig
): Promise<ActionResponse<IAppConfigResponse>> {
  const result = await executeApi(
    async () => updateAppConfigApi(input)
  );
  revalidatePath('/', 'layout');
  return result;
}

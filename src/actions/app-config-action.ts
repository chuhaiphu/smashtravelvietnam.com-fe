'use server';

import { updateTag, cacheLife, cacheTag } from 'next/cache';
import { ActionResponse } from '@/interfaces/_base-interface';
import { IAppConfigResponse, IUpdateAppConfig } from '@/interfaces/app-config-interface';
import { executeApi } from '@/actions/_base';
import {
  getPublicAppConfigApi,
  updateAppConfigApi,
} from '@/apis/app-config-apis';

export async function getAppConfigAction(): Promise<ActionResponse<IAppConfigResponse>> {
  'use cache';
  cacheLife('hours');
  cacheTag('app-config');
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
  if (result.success) {
    updateTag('app-config');
  }
  return result;
}

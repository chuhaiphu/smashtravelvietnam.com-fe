'use server';

import { revalidatePath } from 'next/cache';
import { ActionResponse } from '@/interfaces/_base-interface';
import {
  ISmtpConfigResponse,
  ICreateSmtpConfig,
  IUpdateSmtpConfig,
} from '@/interfaces/smtp-config-interface';
import { executeApi } from '@/actions/_base';
import {
  getSmtpConfigApi,
  updateSmtpConfigApi,
  testSmtpEmailApi,
} from '@/apis/smtp-config-apis';

export async function getSmtpConfigAction(): Promise<ActionResponse<ISmtpConfigResponse | null>> {
  const result = await executeApi(
    async () => getSmtpConfigApi()
  );
  return result as ActionResponse<ISmtpConfigResponse | null>;
}

export async function saveSmtpConfigAction(
  input: ICreateSmtpConfig
): Promise<ActionResponse<ISmtpConfigResponse>> {
  const result = await executeApi(
    async () => updateSmtpConfigApi(input)
  );
  revalidatePath('/admin/settings', 'page');
  return result;
}

export async function updateSmtpConfigAction(
  id: string,
  input: IUpdateSmtpConfig
): Promise<ActionResponse<ISmtpConfigResponse>> {
  const result = await executeApi(
    async () => updateSmtpConfigApi(input)
  );
  revalidatePath('/admin/settings', 'page');
  return result;
}

export async function hasSmtpConfigAction(): Promise<ActionResponse<boolean>> {
  const result = await executeApi(
    async () => getSmtpConfigApi()
  );
  return {
    success: result.success,
    data: result.success && result.data !== null,
    error: result.error,
  };
}

export async function sendTestEmailAction(email: string): Promise<ActionResponse<void>> {
  const result = await executeApi(
    async () => testSmtpEmailApi(email)
  );
  return {
    success: result.success && result.data?.success === true,
    error: result.error || (result.data?.success === false ? 'Failed to send test email' : undefined),
  };
}

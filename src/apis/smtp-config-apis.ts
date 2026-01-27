import { ISmtpConfigResponse, IUpdateSmtpConfig } from "@/interfaces/smtp-config-interface";
import { api } from "./_base";

export async function getSmtpConfigApi() {
  return api<ISmtpConfigResponse>('/admin/smtp-config', {
    method: 'GET',
  });
}

export async function updateSmtpConfigApi(data: IUpdateSmtpConfig) {
  return api<ISmtpConfigResponse>('/admin/smtp-config', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function testSmtpEmailApi(email: string) {
  return api<{ success: boolean }>('/admin/smtp-config/test', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

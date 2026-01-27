import { IActionLog } from "@/interfaces/action-log-interface";
import { api } from "./_base";

export interface ActionLogFilterParams {
  entityType?: string;
  userId?: string;
}

export async function getAllActionLogsApi(filter?: ActionLogFilterParams) {
  const params = new URLSearchParams();
  if (filter?.entityType) params.append('entityType', filter.entityType);
  if (filter?.userId) params.append('userId', filter.userId);
  const queryString = params.toString() ? `?${params.toString()}` : '';
  return api<IActionLog[]>(`/admin/action-logs${queryString}`, {
    method: 'GET',
  });
}

export async function getActionLogsByEntityApi(entityType: string, entityId: string) {
  return api<IActionLog[]>(`/admin/action-logs/${entityType}/${entityId}`, {
    method: 'GET',
  });
}

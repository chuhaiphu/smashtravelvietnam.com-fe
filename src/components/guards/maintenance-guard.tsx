import { redirect } from 'next/navigation';
import { getAppConfigAction } from '@/actions/app-config-action';
import { getMeAction } from '@/actions/auth-action';

export async function MaintenanceGuard() {
  const appConfigResponse = await getAppConfigAction();
  const isMaintenanceMode = appConfigResponse.success ? appConfigResponse.data?.maintenanceMode : false;

  if (isMaintenanceMode) {
    const meResult = await getMeAction();
    const userRole = meResult.success ? meResult.data?.role : null;
    const isAdmin = userRole === 'supadmin' || userRole === 'admin';

    if (!isAdmin) {
      redirect('/maintenance');
    }
  }

  return null;
}

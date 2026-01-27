import { redirect } from 'next/navigation';
import { getAppConfigAction } from '@/actions/app-config-action';
import { getMeAction } from '@/actions/auth-action';

interface MaintenanceGuardProps {
  children: React.ReactNode;
}

export async function MaintenanceGuard({ children }: MaintenanceGuardProps) {
  // Check maintenance mode first
  const appConfigResponse = await getAppConfigAction();
  const isMaintenanceMode = appConfigResponse.success ? appConfigResponse.data?.maintenanceMode : false;

  // Only check session if maintenance mode is ON (to allow admins to bypass)
  if (isMaintenanceMode) {
    const meResult = await getMeAction();
    const userRole = meResult.success ? meResult.data?.role : null;
    const isAdmin = userRole === 'supadmin' || userRole === 'admin';

    if (!isAdmin) {
      redirect('/maintenance');
    }
  }

  return <>{children}</>;
}

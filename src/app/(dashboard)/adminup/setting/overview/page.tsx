import AdminSettingOverviewPageContent from '@/components/mains/admin-settings/admin-setting-overview-page-content/admin-setting-overview-page-content';
import { getAppConfigActionPublic } from '@/actions/app-config-action';
import { Loader } from '@mantine/core';
import { Suspense } from 'react';

export default function OverviewPage() {
  const appConfigPromise = getAppConfigActionPublic();

  return (
    <Suspense fallback={<Loader />}>
      <AdminSettingOverviewPageContent appConfigPromise={appConfigPromise} />
    </Suspense>
  );
}

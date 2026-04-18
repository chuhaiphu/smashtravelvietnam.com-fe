import AdminSettingSeoPageContent from '@/components/mains/admin-settings/admin-setting-seo-page-content/admin-setting-seo-page-content';
import { getAppConfigActionPublic } from '@/actions/app-config-action';
import { Loader } from '@mantine/core';
import { Suspense } from 'react';

export default function SeoPage() {
  const appConfigPromise = getAppConfigActionPublic();

  return (
    <Suspense fallback={<Loader />}>
      <AdminSettingSeoPageContent appConfigPromise={appConfigPromise} />
    </Suspense>
  );
}

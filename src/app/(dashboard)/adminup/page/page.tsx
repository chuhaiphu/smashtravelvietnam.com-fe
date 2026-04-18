import AdminPagePageContent from '@/components/mains/admin-page-page/admin-page-page-content/admin-page-page-content';
import { getAllPagesAdminActionPrivate } from '@/actions/page-action';
import { getMeActionPrivate } from '@/actions/auth-action';
import { Loader } from '@mantine/core';
import { Suspense } from 'react';

export default function AdminPagePage() {
  const pagesDataPromise = getAllPagesAdminActionPrivate();
  const userDataPromise = getMeActionPrivate();

  return (
    <Suspense fallback={<Loader size={48} />}>
      <AdminPagePageContent
        pagesDataPromise={pagesDataPromise}
        userDataPromise={userDataPromise}
      />
    </Suspense>
  );
}

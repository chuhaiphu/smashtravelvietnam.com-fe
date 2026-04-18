import AdminPageDetailPageContent from '@/components/mains/admin-page-page/admin-page-detail-page-content/admin-page-detail-page-content';
import { getPageByIdActionPrivate } from '@/actions/page-action';
import { getMeActionPrivate } from '@/actions/auth-action';
import { Suspense } from 'react';

export default function AdminPageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const currentPagePromise = params.then((p) => getPageByIdActionPrivate(p.id));
  const userDataPromise = getMeActionPrivate();

  return (
    <Suspense>
      <AdminPageDetailPageContent
        currentPagePromise={currentPagePromise}
        userDataPromise={userDataPromise}
      />
    </Suspense>
  );
}

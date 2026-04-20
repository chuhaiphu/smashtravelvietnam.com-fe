import { Loader } from '@mantine/core';
import { Suspense } from 'react';
import AdminSectionUIDetailPageContent from '@/components/mains/admin-section-ui/admin-section-ui-detail-page-content/admin-section-ui-detail-page-content';
import {
  getAllSectionUIsActionPublic,
  getUsedSectionUIPositionsActionPublic,
} from '@/actions/section-ui-action';

export default function AdminSectionUIPage() {
  const existingDynamicSectionUIsPromise = getAllSectionUIsActionPublic().then(
    (res) => res.data ?? []
  );
  const usedPositionsPromise = getUsedSectionUIPositionsActionPublic().then(
    (res) => res.data ?? []
  );

  return (
    <Suspense fallback={<Loader size={48} />}>
      <AdminSectionUIDetailPageContent
        existingDynamicSectionUIsPromise={existingDynamicSectionUIsPromise}
        usedPositionsPromise={usedPositionsPromise}
      />
    </Suspense>
  );
}

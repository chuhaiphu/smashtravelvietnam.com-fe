import AdminSectionUIDetailPageContent from '@/components/mains/admin-section-ui/admin-section-ui-detail-page-content/admin-section-ui-detail-page-content';
import {
  getAllSectionUIsActionPublic,
  getUsedSectionUIPositionsActionPublic,
} from '@/actions/section-ui-action';
import { Suspense } from 'react';

export default async function AdminSectionUIPage() {
  const dynamicSectionUIsResponse = await getAllSectionUIsActionPublic();
  const usedPositionsResponse = await getUsedSectionUIPositionsActionPublic();

  return (
    <Suspense>
      <AdminSectionUIDetailPageContent
        existingDynamicSectionUIs={dynamicSectionUIsResponse.data ?? []}
        usedPositions={usedPositionsResponse.data ?? []}
      />
    </Suspense>
  );
}

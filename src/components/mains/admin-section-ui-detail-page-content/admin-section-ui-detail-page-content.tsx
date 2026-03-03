import {
  getAllSectionUIsAction,
  getUsedSectionUIPositionsAction,
} from '@/actions/section-ui-action';
import AdminSectionUIDetailPageContentContainer from './admin-section-ui-detail-page-content-container/admin-section-ui-detail-page-content-container';

export default async function AdminSectionUIDetailPageContent() {
  // Get all existing DynamicSectionUIs
  const dynamicSectionUIsResponse = await getAllSectionUIsAction();
  // Get all used positions
  const usedPositionsResponse = await getUsedSectionUIPositionsAction();

  return (
    <AdminSectionUIDetailPageContentContainer
      existingDynamicSectionUIs={dynamicSectionUIsResponse.data ?? []}
      usedPositions={usedPositionsResponse.data ?? []}
    />
  );
}

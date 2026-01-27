import { getSectionUIsByTypeAction, getUsedSectionUIPositionsAction } from "@/actions/section-ui-action";
import AdminSectionUIDetailPageContentContainer from "./admin-section-ui-detail-page-content-container/admin-section-ui-detail-page-content-container";

interface AdminSectionUIDetailPageContentProps {
  params: Promise<{ type: string }>;
}

export default async function AdminSectionUIDetailPageContent({
  params
}: AdminSectionUIDetailPageContentProps) {
  const { type } = await params;

  // Get all existing DynamicSectionUIs of this type
  const dynamicSectionUIsResponse = await getSectionUIsByTypeAction(type);
  // Get all used positions
  const usedPositionsResponse = await getUsedSectionUIPositionsAction();

  return (
    <AdminSectionUIDetailPageContentContainer
      type={type}
      existingDynamicSectionUIs={dynamicSectionUIsResponse.data ?? []}
      usedPositions={usedPositionsResponse.data ?? []}
    />
  );
}

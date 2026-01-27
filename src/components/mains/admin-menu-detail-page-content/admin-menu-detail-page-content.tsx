import { getAllMenusAction, getAvailableSortOrdersAction, getMenuByIdAction } from "@/actions/menu-action";
import { getAllTourCategoriesAction } from "@/actions/tour-category-action";
import { notFound } from "next/navigation";
import AdminMenuDetailPageContentContainer from "./admin-menu-detail-page-content-container/admin-menu-detail-page-content-container";

interface AdminMenuDetailPageContentProps {
  params: Promise<{ id: string }>;
}

export default async function AdminMenuDetailPageContent({
  params
}: AdminMenuDetailPageContentProps) {
  const { id } = await params;

  const [currentMenuResponse, menusResponse, tourCategoriesResponse] = await Promise.all([
    getMenuByIdAction(id),
    getAllMenusAction(),
    getAllTourCategoriesAction(),
  ]);
  const availableSortOrdersResponse = await getAvailableSortOrdersAction(currentMenuResponse.data?.parent?.id || '');

  if (!currentMenuResponse.success || !currentMenuResponse.data) {
    notFound();
  }

  return (
    <AdminMenuDetailPageContentContainer
      currentMenu={currentMenuResponse.data}
      menusData={menusResponse.data ?? []}
      availableSortOrdersData={availableSortOrdersResponse.data ?? []}
      tourCategoriesData={tourCategoriesResponse.data ?? []}
    />
  );
}

import AdminMenuDetailPageContent from '@/components/mains/admin-menu/admin-menu-detail-page-content/admin-menu-detail-page-content';
import {
  getAllMenusActionPrivate,
  getAvailableSortOrdersActionPrivate,
  getMenuByIdActionPrivate,
} from '@/actions/menu-action';
import { getAllTourCategoriesActionPublic } from '@/actions/tour-category-action';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default async function AdminMenuDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [currentMenuResponse, menusResponse, tourCategoriesResponse] = await Promise.all([
    getMenuByIdActionPrivate(id),
    getAllMenusActionPrivate(),
    getAllTourCategoriesActionPublic(),
  ]);
  const availableSortOrdersResponse = await getAvailableSortOrdersActionPrivate(
    currentMenuResponse.data?.parent?.id || ''
  );

  if (!currentMenuResponse.success || !currentMenuResponse.data) {
    notFound();
  }

  return (
    <Suspense>
      <AdminMenuDetailPageContent
        currentMenu={currentMenuResponse.data}
        menusData={menusResponse.data ?? []}
        availableSortOrdersData={availableSortOrdersResponse.data ?? []}
        tourCategoriesData={tourCategoriesResponse.data ?? []}
      />
    </Suspense>
  );
}

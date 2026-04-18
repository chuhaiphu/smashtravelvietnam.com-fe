import AdminTourCategoryDetailPageContent from "@/components/mains/admin-tour/admin-tour-category-detail-page-content/admin-tour-category-detail-page-content";
import {
  getAllTourCategoriesActionPublic,
  getAvailableSortOrdersActionPrivate,
  getTourCategoryByIdActionPrivate,
} from "@/actions/tour-category-action";
import { Suspense } from "react";

export default function AdminTourCategoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const detailDataPromise = params.then(async (p) => {
    const [currentTourCategoryResponse, tourCategoriesResponse] = await Promise.all([
      getTourCategoryByIdActionPrivate(p.id),
      getAllTourCategoriesActionPublic(),
    ]);
    const availableSortOrdersResponse = await getAvailableSortOrdersActionPrivate(
      currentTourCategoryResponse.data?.parent?.id || ''
    );
    return {
      currentTourCategoryResponse,
      tourCategoriesResponse,
      availableSortOrdersResponse,
    };
  });

  return (
    <Suspense>
      <AdminTourCategoryDetailPageContent detailDataPromise={detailDataPromise} />
    </Suspense>
  );
}

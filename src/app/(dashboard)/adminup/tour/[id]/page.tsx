import AdminTourDetailPageContent from "@/components/mains/admin-tour/admin-tour-detail-page-content/admin-tour-detail-page-content";
import { getTourByIdActionPrivate } from "@/actions/tour-action";
import { getAllTourCategoriesActionPublic } from "@/actions/tour-category-action";
import { getMeActionPrivate } from "@/actions/auth-action";
import { Suspense } from "react";

export default function AdminTourDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const currentTourPromise = params.then((p) => getTourByIdActionPrivate(p.id));
  const tourCategoriesPromise = getAllTourCategoriesActionPublic();
  const userDataPromise = getMeActionPrivate();

  return (
    <Suspense>
      <AdminTourDetailPageContent
        currentTourPromise={currentTourPromise}
        tourCategoriesPromise={tourCategoriesPromise}
        userDataPromise={userDataPromise}
      />
    </Suspense>
  );
}
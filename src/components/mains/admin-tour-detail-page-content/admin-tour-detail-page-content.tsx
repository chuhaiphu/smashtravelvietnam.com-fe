import { getTourByIdAction } from "@/actions/tour-action";
import { getAllTourCategoriesAction } from "@/actions/tour-category-action";
import { getMeAction } from "@/actions/auth-action";
import { redirect } from "next/navigation";
import AdminTourDetailPageContentContainer from "./admin-tour-detail-page-content-container/admin-tour-detail-page-content-container";

interface AdminTourDetailPageContentProps {
  params: Promise<{ id: string }>;
}

export default async function AdminTourDetailPageContent({
  params
}: AdminTourDetailPageContentProps) {
  const { id } = await params;
  const meResult = await getMeAction();

  if (!meResult.success || !meResult.data) {
    redirect('/login');
  }

  const [currentTourResponse, tourCategoriesResponse] = await Promise.all([
    getTourByIdAction(id),
    getAllTourCategoriesAction(),
  ]);

  if (!currentTourResponse.success || !currentTourResponse.data) {
    return <div>Tour not found</div>;
  }

  return (
    <AdminTourDetailPageContentContainer
      currentTourData={currentTourResponse.data}
      tourCategoriesData={tourCategoriesResponse.data ?? []}
      userData={meResult.data}
    />
  );
}

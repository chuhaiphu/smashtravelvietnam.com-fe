import { getPageByIdAction } from "@/actions/page-action";
import { getMeAction } from "@/actions/auth-action";
import { redirect } from "next/navigation";
import AdminPageDetailPageContentContainer from "./admin-page-detail-page-content-container/admin-page-detail-page-content-container";

interface AdminPageDetailPageContentProps {
  params: Promise<{ id: string }>;
}

export default async function AdminPageDetailPageContent({
  params
}: AdminPageDetailPageContentProps) {
  const { id } = await params;
  const meResult = await getMeAction();

  if (!meResult.success || !meResult.data) {
    redirect('/login');
  }

  const currentPageResponse = await getPageByIdAction(id);

  if (!currentPageResponse.success || !currentPageResponse.data) {
    return <div>Page not found</div>;
  }

  return (
    <AdminPageDetailPageContentContainer
      currentPageData={currentPageResponse.data}
      userData={meResult.data}
    />
  );
}

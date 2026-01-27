import { getAllPagesAction } from "@/actions/page-action";
import { getMeAction } from "@/actions/auth-action";
import { redirect } from "next/navigation";
import AdminPagePageContentContainer from "./admin-page-page-content-container/admin-page-page-content-container";

export default async function AdminPagePageContent() {
  const pagesData = await getAllPagesAction();
  const meResult = await getMeAction();

  if (!meResult.success || !meResult.data) {
    redirect('/login');
  }

  return (
    <AdminPagePageContentContainer
      pagesData={pagesData?.data ?? []}
      userData={meResult.data}
    />
  );
}

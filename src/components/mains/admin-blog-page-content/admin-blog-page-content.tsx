import { getAllBlogsAction } from "@/actions/blog-action";
import { getMeAction } from "@/actions/auth-action";
import { redirect } from "next/navigation";
import AdminBlogPageContentContainer from "./admin-blog-page-content-container/admin-blog-page-content-container";

export default async function AdminBlogPageContent() {
  const blogsData = await getAllBlogsAction();
  const meResult = await getMeAction();

  if (!meResult.success || !meResult.data) {
    redirect('/login');
  }

  return (
    <AdminBlogPageContentContainer
      blogsData={blogsData?.data ?? []}
      userData={meResult.data}
    />
  );
}

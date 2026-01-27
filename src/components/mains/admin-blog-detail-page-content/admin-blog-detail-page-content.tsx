import { getBlogByIdAction } from "@/actions/blog-action";
import { getAllBlogCategoriesAction } from "@/actions/blog-category-action";
import { getMeAction } from "@/actions/auth-action";
import { redirect } from "next/navigation";
import AdminBlogDetailPageContentContainer from "./admin-blog-detail-page-content-container/admin-blog-detail-page-content-container";

interface AdminBlogDetailPageContentProps {
  params: Promise<{ id: string }>;
}

export default async function AdminBlogDetailPageContent({
  params
}: AdminBlogDetailPageContentProps) {
  const { id } = await params;
  const meResult = await getMeAction();

  if (!meResult.success || !meResult.data) {
    redirect('/login');
  }

  const [currentBlogResponse, blogCategoriesResponse] = await Promise.all([
    getBlogByIdAction(id),
    getAllBlogCategoriesAction(),
  ]);

  if (!currentBlogResponse.success || !currentBlogResponse.data) {
    return <div>Blog not found</div>;
  }

  return (
    <AdminBlogDetailPageContentContainer
      currentBlogData={currentBlogResponse.data}
      blogCategoriesData={blogCategoriesResponse.data ?? []}
      userData={meResult.data}
    />
  );
}

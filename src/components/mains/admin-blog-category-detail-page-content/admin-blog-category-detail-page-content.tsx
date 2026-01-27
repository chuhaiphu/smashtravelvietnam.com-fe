import { getAllBlogCategoriesAction, getAvailableSortOrdersAction, getBlogCategoryByIdAction } from "@/actions/blog-category-action";
import { notFound } from "next/navigation";
import AdminBlogCategoryDetailPageContentContainer from "./admin-blog-category-detail-page-content-container/admin-blog-category-detail-page-content-container";

interface AdminBlogCategoryDetailPageContentProps {
  params: Promise<{ id: string }>;
}

export default async function AdminBlogCategoryDetailPageContent({
  params
}: AdminBlogCategoryDetailPageContentProps) {
  const { id } = await params;

  const [currentBlogCategoryResponse, blogCategoriesResponse] = await Promise.all([
    getBlogCategoryByIdAction(id),
    getAllBlogCategoriesAction(),
  ]);
  const availableSortOrdersResponse = await getAvailableSortOrdersAction(currentBlogCategoryResponse.data?.parent?.id || '');

  if (!currentBlogCategoryResponse.success || !currentBlogCategoryResponse.data) {
    notFound();
  }

  return (
    <AdminBlogCategoryDetailPageContentContainer
      currentBlogCategory={currentBlogCategoryResponse.data}
      blogCategoriesData={blogCategoriesResponse.data ?? []}
      availableSortOrdersData={availableSortOrdersResponse.data ?? []}
    />
  );
}

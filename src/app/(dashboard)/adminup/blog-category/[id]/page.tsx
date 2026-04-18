import AdminBlogCategoryDetailPageContent from "@/components/mains/admin-blog/admin-blog-category-detail-page-content/admin-blog-category-detail-page-content";
import {
  getAllBlogCategoriesActionPrivate,
  getAvailableSortOrdersActionPrivate,
  getBlogCategoryByIdActionPrivate,
} from "@/actions/blog-category-action";
import { Suspense } from "react";

export default function AdminBlogCategoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const detailDataPromise = params.then(async (p) => {
    const [currentBlogCategoryResponse, blogCategoriesResponse] = await Promise.all([
      getBlogCategoryByIdActionPrivate(p.id),
      getAllBlogCategoriesActionPrivate(),
    ]);
    const availableSortOrdersResponse = await getAvailableSortOrdersActionPrivate(
      currentBlogCategoryResponse.data?.parent?.id || ''
    );
    return {
      currentBlogCategoryResponse,
      blogCategoriesResponse,
      availableSortOrdersResponse,
    };
  });

  return (
    <Suspense>
      <AdminBlogCategoryDetailPageContent detailDataPromise={detailDataPromise} />
    </Suspense>
  );
}


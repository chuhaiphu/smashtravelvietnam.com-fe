import AdminBlogDetailPageContent from "@/components/mains/admin-blog/admin-blog-detail-page-content/admin-blog-detail-page-content";
import { getBlogByIdActionPrivate } from "@/actions/blog-action";
import { getAllBlogCategoriesActionPrivate } from "@/actions/blog-category-action";
import { getMeActionPrivate } from "@/actions/auth-action";
import { Suspense } from "react";

export default function AdminBlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const currentBlogPromise = params.then((p) => getBlogByIdActionPrivate(p.id));
  const blogCategoriesPromise = getAllBlogCategoriesActionPrivate();
  const userDataPromise = getMeActionPrivate();

  return (
    <Suspense>
      <AdminBlogDetailPageContent
        currentBlogPromise={currentBlogPromise}
        blogCategoriesPromise={blogCategoriesPromise}
        userDataPromise={userDataPromise}
      />
    </Suspense>
  );
}


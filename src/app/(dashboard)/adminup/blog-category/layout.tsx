import AdminBlogCategoryLayoutContent from "@/components/mains/admin-blog/admin-blog-category-layout-content/admin-blog-category-layout-content";
import { getAllBlogCategoriesActionPrivate } from "@/actions/blog-category-action";
import { Loader } from "@mantine/core";
import { Suspense } from "react";

export default function AdminBlogCategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const blogCategoriesPromise = getAllBlogCategoriesActionPrivate();

  return (
    <Suspense fallback={<Loader size={48} />}>
      <AdminBlogCategoryLayoutContent blogCategoriesPromise={blogCategoriesPromise}>
        {children}
      </AdminBlogCategoryLayoutContent>
    </Suspense>
  );
}


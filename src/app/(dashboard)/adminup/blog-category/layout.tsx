import AdminBlogCategoryLayoutContent from "@/components/mains/admin-blog-category-layout-content/admin-blog-category-layout-content";
import { Suspense } from "react";

export default async function AdminBlogCategoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <AdminBlogCategoryLayoutContent>
        {children}
      </AdminBlogCategoryLayoutContent>
    </Suspense>
  );
}


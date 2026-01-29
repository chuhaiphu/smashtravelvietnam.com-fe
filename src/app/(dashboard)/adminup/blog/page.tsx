import AdminBlogPageContent from "@/components/mains/admin-blog-page-content/admin-blog-page-content";
import { Suspense } from "react";

export default async function AdminBlogPage() {
  return (
    <Suspense>
      <AdminBlogPageContent />
    </Suspense>
  );
}
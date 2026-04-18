import AdminBlogPageContent from "@/components/mains/admin-blog/admin-blog-page-content/admin-blog-page-content";
import { getAllBlogsActionPrivate } from "@/actions/blog-action";
import { getMeActionPrivate } from "@/actions/auth-action";
import { Loader } from "@mantine/core";
import { Suspense } from "react";

export default function AdminBlogPage() {
  const blogsDataPromise = getAllBlogsActionPrivate();
  const userDataPromise = getMeActionPrivate();

  return (
    <Suspense fallback={<Loader size={48} />}>
      <AdminBlogPageContent
        blogsDataPromise={blogsDataPromise}
        userDataPromise={userDataPromise}
      />
    </Suspense>
  );
}

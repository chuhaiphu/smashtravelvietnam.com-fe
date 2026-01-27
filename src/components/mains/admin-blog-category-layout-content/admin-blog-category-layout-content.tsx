import { getAllBlogCategoriesAction } from "@/actions/blog-category-action";
import AdminBlogCategoryLayoutContentContainer from "./admin-blog-category-layout-content-container/admin-blog-category-layout-content-container";
import classes from "./admin-blog-category-layout-content.module.scss";

interface AdminBlogCategoryLayoutContentProps {
  children: React.ReactNode;
}

export default async function AdminBlogCategoryLayoutContent({ children }: AdminBlogCategoryLayoutContentProps) {
  const blogCategoriesData = await getAllBlogCategoriesAction();

  return (
    <div className={classes.adminBlogCategoryLayoutRoot}>
      <AdminBlogCategoryLayoutContentContainer
        blogCategoriesData={blogCategoriesData?.data ?? []}
      >
        {children}
      </AdminBlogCategoryLayoutContentContainer>
    </div>
  );
}

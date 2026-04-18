import AdminTourCategoryLayoutContent from "@/components/mains/admin-tour/admin-tour-category-layout-content/admin-tour-category-layout-content";
import { getAllTourCategoriesActionPublic } from "@/actions/tour-category-action";
import { Loader } from "@mantine/core";
import { Suspense } from "react";

export default function AdminTourCategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tourCategoriesPromise = getAllTourCategoriesActionPublic();

  return (
    <Suspense fallback={<Loader size={48} />}>
      <AdminTourCategoryLayoutContent tourCategoriesPromise={tourCategoriesPromise}>
        {children}
      </AdminTourCategoryLayoutContent>
    </Suspense>
  );
}
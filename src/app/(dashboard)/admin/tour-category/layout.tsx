import AdminTourCategoryLayoutContent from "@/components/mains/admin-tour-category-layout-content/admin-tour-category-layout-content";
import { Suspense } from "react";

export default async function AdminTourCategoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <AdminTourCategoryLayoutContent>
      {children}
    </AdminTourCategoryLayoutContent>
    </Suspense>
  );
}
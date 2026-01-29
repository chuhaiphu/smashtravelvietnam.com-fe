import AdminMenuLayoutContent from "@/components/mains/admin-menu-layout-content/admin-menu-layout-content";
import { Suspense } from "react";

export default async function AdminMenuLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <AdminMenuLayoutContent>
        {children}
      </AdminMenuLayoutContent>
    </Suspense>
  );
}
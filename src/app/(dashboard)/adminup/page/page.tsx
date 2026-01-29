import AdminPagePageContent from "@/components/mains/admin-page-page-content/admin-page-page-content";
import { Suspense } from "react";

export default async function AdminPagePage() {
  return (
    <Suspense>
      <AdminPagePageContent />
    </Suspense>
  );
}


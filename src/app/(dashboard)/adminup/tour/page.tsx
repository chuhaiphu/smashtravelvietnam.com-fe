import AdminTourPageContent from "@/components/mains/admin-tour-page-content/admin-tour-page-content";
import { Suspense } from "react";

export default async function AdminTourPage() {
  return (
    <Suspense>
      <AdminTourPageContent />
    </Suspense>
  );
}
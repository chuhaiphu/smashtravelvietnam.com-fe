import AdminSectionUIDetailPageContent from "@/components/mains/admin-section-ui-detail-page-content/admin-section-ui-detail-page-content";
import { Suspense } from "react";

export default async function AdminSectionUIDetailPage({
  params
}: { params: Promise<{ type: string }> }) {
  return (
    <Suspense>
      <AdminSectionUIDetailPageContent params={params} />
    </Suspense>
  );
}

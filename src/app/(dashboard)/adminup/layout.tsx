import AdminLayoutContent from "@/components/mains/admin-layout-content/admin-layout-content";
import { getMeActionPrivate } from "@/actions/auth-action";
import { Suspense } from "react";

export default function AdminLayoutRoot({ children }: { children: React.ReactNode }) {
  const userPromise = getMeActionPrivate();

  return (
    <Suspense>
      <AdminLayoutContent userPromise={userPromise}>{children}</AdminLayoutContent>
    </Suspense>
  );
}

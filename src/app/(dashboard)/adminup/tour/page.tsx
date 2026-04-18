import AdminTourPageContent from "@/components/mains/admin-tour/admin-tour-page-content/admin-tour-page-content";
import { getAllToursActionPrivate } from "@/actions/tour-action";
import { getMeActionPrivate } from "@/actions/auth-action";
import { Loader } from "@mantine/core";
import { Suspense } from "react";

export default function AdminTourPage() {
  const toursDataPromise = getAllToursActionPrivate();
  const userDataPromise = getMeActionPrivate();

  return (
    <Suspense fallback={<Loader size={48} />}>
      <AdminTourPageContent
        toursDataPromise={toursDataPromise}
        userDataPromise={userDataPromise}
      />
    </Suspense>
  );
}
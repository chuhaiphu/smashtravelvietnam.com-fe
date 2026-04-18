import AdminUserPageContent from "@/components/mains/admin-user/admin-user-page-content/admin-user-page-content";
import { getAllUsersActionPrivate } from "@/actions/user-action";
import { getMeActionPrivate } from "@/actions/auth-action";
import { Loader } from "@mantine/core";
import { Suspense } from "react";

export default function AdminUserPage() {
  const usersDataPromise = getAllUsersActionPrivate();
  const userDataPromise = getMeActionPrivate();

  return (
    <Suspense fallback={<Loader size={48} />}>
      <AdminUserPageContent
        usersDataPromise={usersDataPromise}
        userDataPromise={userDataPromise}
      />
    </Suspense>
  );
}

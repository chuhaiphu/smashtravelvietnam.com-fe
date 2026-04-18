'use client';

import { Group, Text } from "@mantine/core";
import classes from "./admin-user-page-content.module.scss";
import UsersTable from "@/components/tables/users-table/users-table";
import { IUserResponse } from "@/interfaces/user-interface";
import { use } from "react";
import { redirect } from "next/navigation";
import { ActionResponse } from "@/interfaces/_base-interface";

interface AdminUserPageContentInnerProps {
  usersData: IUserResponse[];
  userData: IUserResponse;
}

function AdminUserPageContentInner({
  usersData,
  userData,
}: AdminUserPageContentInnerProps) {
  return (
    <div className={classes.adminUserPageRoot}>
      <Group className={classes.pageHeader} justify="space-between">
        <Text size="xl">User Management</Text>
      </Group>

      <div className={classes.pageContent}>
        <UsersTable usersData={usersData} currentUserId={userData.id} />
      </div>
    </div>
  );
}

interface AdminUserPageContentProps {
  usersDataPromise: Promise<IUserResponse[] | undefined>;
  userDataPromise: Promise<ActionResponse<IUserResponse>>;
}

export default function AdminUserPageContent({
  usersDataPromise,
  userDataPromise,
}: AdminUserPageContentProps) {
  const meResult = use(userDataPromise);
  const usersData = use(usersDataPromise) ?? [];

  if (!meResult.success || !meResult.data) {
    redirect("/login");
  }

  if (meResult.data.role !== "supadmin") {
    redirect("/adminup");
  }

  return (
    <AdminUserPageContentInner usersData={usersData} userData={meResult.data} />
  );
}

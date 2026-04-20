import { Group, Loader, Text } from '@mantine/core';
import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import UsersTable from '@/components/tables/users-table/users-table';
import { getAllUsersActionPrivate } from '@/actions/user-action';
import { getMeActionPrivate } from '@/actions/auth-action';
import classes from './page.module.scss';

export default async function AdminUserPage() {
  const userResult = await getMeActionPrivate();
  if (!userResult.success || !userResult.data) {
    redirect('/login');
  }
  if (userResult.data.role !== 'supadmin') {
    redirect('/adminup');
  }

  const usersDataPromise = getAllUsersActionPrivate().then(
    (res) => res ?? []
  );

  return (
    <div className={classes.adminUserPageRoot}>
      <Group className={classes.pageHeader} justify="space-between">
        <Text size="xl">User Management</Text>
      </Group>
      <Suspense fallback={<Loader size={48} />}>
        <UsersTable
          usersDataPromise={usersDataPromise}
          currentUserId={userResult.data.id}
        />
      </Suspense>
    </div>
  );
}

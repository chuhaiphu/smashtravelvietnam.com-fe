import { Group, Loader, Text } from '@mantine/core';
import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import PagesTable from '@/components/tables/pages-table/pages-table';
import CreatePageAction from '@/components/mains/admin-page-page/create-page-action/create-page-action';
import { getAllPagesAdminActionPrivate } from '@/actions/page-action';
import { getMeActionPrivate } from '@/actions/auth-action';
import classes from './page.module.scss';

export default async function AdminPagePage() {
  const userResult = await getMeActionPrivate();
  if (!userResult.success || !userResult.data) {
    redirect('/login');
  }

  const pagesDataPromise = getAllPagesAdminActionPrivate().then(
    (res) => res.data ?? []
  );

  return (
    <div className={classes.adminPagePageRoot}>
      <Group className={classes.pageHeader} justify="space-between">
        <Text size="xl">Page</Text>
        <CreatePageAction userId={userResult.data.id} />
      </Group>
      <Suspense fallback={<Loader size={48} />}>
        <PagesTable pagesDataPromise={pagesDataPromise} />
      </Suspense>
    </div>
  );
}

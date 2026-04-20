import { Group, Loader, Text } from '@mantine/core';
import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import ToursTable from '@/components/tables/tours-table/tours-table';
import CreateTourAction from '@/components/mains/admin-tour/create-tour-action/create-tour-action';
import { getAllToursActionPrivate } from '@/actions/tour-action';
import { getMeActionPrivate } from '@/actions/auth-action';
import classes from './page.module.scss';

export default async function AdminTourPage() {
  const userResult = await getMeActionPrivate();
  if (!userResult.success || !userResult.data) {
    redirect('/login');
  }

  const toursDataPromise = getAllToursActionPrivate().then(
    (res) => res.data ?? []
  );

  return (
    <div className={classes.adminTourPageRoot}>
      <Group className={classes.pageHeader} justify="space-between">
        <Text size="xl">Tour</Text>
        <CreateTourAction userId={userResult.data.id} />
      </Group>
      <Suspense fallback={<Loader size={48} />}>
        <ToursTable toursDataPromise={toursDataPromise} />
      </Suspense>
    </div>
  );
}

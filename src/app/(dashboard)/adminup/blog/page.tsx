import { Group, Loader, Text } from '@mantine/core';
import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import BlogsTable from '@/components/tables/blogs-table/blogs-table';
import CreateBlogAction from '@/components/mains/admin-blog/create-blog-action/create-blog-action';
import { getAllBlogsActionPrivate } from '@/actions/blog-action';
import { getMeActionPrivate } from '@/actions/auth-action';
import classes from './page.module.scss';

export default async function AdminBlogPage() {
  const userResult = await getMeActionPrivate();
  if (!userResult.success || !userResult.data) {
    redirect('/login');
  }

  const blogsDataPromise = getAllBlogsActionPrivate().then(
    (res) => res.data ?? []
  );

  return (
    <div className={classes.adminBlogPageRoot}>
      <Group className={classes.pageHeader} justify="space-between">
        <Text size="xl">Blog</Text>
        <CreateBlogAction userId={userResult.data.id} />
      </Group>
      <Suspense fallback={<Loader size={48} />}>
        <BlogsTable blogsDataPromise={blogsDataPromise} />
      </Suspense>
    </div>
  );
}

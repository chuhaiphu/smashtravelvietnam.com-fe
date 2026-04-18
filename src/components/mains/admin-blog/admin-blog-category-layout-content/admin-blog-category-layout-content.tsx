'use client';

import {
  ActionIcon,
  Grid,
  GridCol,
  Group,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { useRouter } from 'next/navigation';
import { Route } from 'next';
import AddNewIcon from '@/components/icons/vinaup-add-new-icon.svg';
import { generateUniqueEndpoint } from '@/utils/function-helpers';
import { use, useState } from 'react';
import { IBlogCategoryResponse } from '@/interfaces/blog-category-interface';
import { createBlogCategoryActionPrivate } from '@/actions/blog-category-action';
import BlogCategoryNav from '@/components/sidebars/blog-category-nav/blog-category-nav';
import classes from './admin-blog-category-layout-content.module.scss';
import { ActionResponse } from '@/interfaces/_base-interface';

interface AdminBlogCategoryLayoutContentInnerProps {
  blogCategoriesData: IBlogCategoryResponse[];
  children: React.ReactNode;
}

function AdminBlogCategoryLayoutContentInner({
  blogCategoriesData,
  children,
}: AdminBlogCategoryLayoutContentInnerProps) {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const handleAddNewBlogCategory = async () => {
    setIsCreating(true);
    const newTitle = 'New Blog Category';
    const endpoint = await generateUniqueEndpoint(newTitle, 'landing');
    const response = await createBlogCategoryActionPrivate({
      title: newTitle,
      endpoint: endpoint,
    });

    if (!response.success || !response.data) {
      setIsCreating(false);
      return;
    }

    const categoryId = response.data.id;
    setIsCreating(false);
    router.push(`/adminup/blog-category/${categoryId}` as Route);
  };

  return (
    <div className={classes.adminBlogCategoryLayoutRoot}>
      <Group className={classes.pageHeader} justify="space-between">
        <Text size="xl">Blog Category</Text>
        <Group gap="sm">
          <UnstyledButton onClick={handleAddNewBlogCategory} fz={'lg'}>
            Add new
          </UnstyledButton>
          <ActionIcon
            variant="transparent"
            onClick={handleAddNewBlogCategory}
            loading={isCreating}
          >
            <AddNewIcon width={24} height={24} />
          </ActionIcon>
        </Group>
      </Group>
      <Grid>
        <GridCol span={{ base: 12, sm: 12, md: 4, lg: 4, xl: 3 }}>
          <BlogCategoryNav blogCategoriesData={blogCategoriesData} />
        </GridCol>
        <GridCol span={{ base: 12, sm: 12, md: 8, lg: 8, xl: 9 }}>
          {children}
        </GridCol>
      </Grid>
    </div>
  );
}

interface AdminBlogCategoryLayoutContentProps {
  blogCategoriesPromise: Promise<ActionResponse<IBlogCategoryResponse[]>>;
  children: React.ReactNode;
}

export default function AdminBlogCategoryLayoutContent({
  blogCategoriesPromise,
  children,
}: AdminBlogCategoryLayoutContentProps) {
  const blogCategoriesResult = use(blogCategoriesPromise);
  const blogCategoriesData = blogCategoriesResult.data ?? [];

  return (
    <AdminBlogCategoryLayoutContentInner blogCategoriesData={blogCategoriesData}>
      {children}
    </AdminBlogCategoryLayoutContentInner>
  );
}

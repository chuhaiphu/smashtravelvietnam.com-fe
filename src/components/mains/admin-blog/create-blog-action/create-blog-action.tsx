'use client';

import { ActionIcon, Group, UnstyledButton } from '@mantine/core';
import { useRouter } from 'next/navigation';
import AddNewIcon from '@/components/icons/vinaup-add-new-icon.svg';
import { createBlogActionPrivate } from '@/actions/blog-action';
import { Route } from 'next';
import { generateUniqueEndpoint } from '@/utils/function-helpers';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';

interface CreateBlogActionProps {
  userId: string;
}

export default function CreateBlogAction({ userId }: CreateBlogActionProps) {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const handleAddNewBlog = async () => {
    setIsCreating(true);
    const newTitle = '';
    const endpoint = await generateUniqueEndpoint(newTitle, 'blog');

    const response = await createBlogActionPrivate({
      title: newTitle,
      endpoint: endpoint,
      destinations: ['Ho Chi Minh'],
      userId,
    });

    if (!response.success || !response.data) {
      notifications.show({
        title: 'Create blog failed',
        message: response.error || 'Failed to create blog',
        color: 'red',
      });
      setIsCreating(false);
      return;
    }

    const blogId = response.data.id;
    setIsCreating(false);
    router.push(`/adminup/blog/${blogId}` as Route);
  };

  return (
    <Group gap="sm">
      <UnstyledButton onClick={handleAddNewBlog} fz={'lg'}>
        Add new
      </UnstyledButton>
      <ActionIcon
        variant="transparent"
        onClick={handleAddNewBlog}
        loading={isCreating}
      >
        <AddNewIcon width={24} height={24} />
      </ActionIcon>
    </Group>
  );
}

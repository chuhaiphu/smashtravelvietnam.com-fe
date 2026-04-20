'use client';

import { ActionIcon, Group, UnstyledButton } from '@mantine/core';
import { useRouter } from 'next/navigation';
import AddNewIcon from '@/components/icons/vinaup-add-new-icon.svg';
import { createPageActionPrivate } from '@/actions/page-action';
import { Route } from 'next';
import { generateUniqueEndpoint } from '@/utils/function-helpers';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';

interface CreatePageActionProps {
  userId: string;
}

export default function CreatePageAction({ userId }: CreatePageActionProps) {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const handleAddNewPage = async () => {
    setIsCreating(true);
    const newTitle = 'Untitled';
    const endpoint = await generateUniqueEndpoint(newTitle, 'landing');

    const response = await createPageActionPrivate({
      title: newTitle,
      endpoint: endpoint,
      destinations: [],
      userId,
    });

    if (!response.success || !response.data) {
      notifications.show({
        title: 'Create page failed',
        message: response.error || 'Failed to create page',
        color: 'red',
      });
      setIsCreating(false);
      return;
    }

    const pageId = response.data.id;
    setIsCreating(false);
    router.push(`/adminup/page/${pageId}` as Route);
  };

  return (
    <Group gap="sm">
      <UnstyledButton onClick={handleAddNewPage} fz={'lg'}>
        Add new
      </UnstyledButton>
      <ActionIcon
        variant="transparent"
        onClick={handleAddNewPage}
        loading={isCreating}
      >
        <AddNewIcon width={24} height={24} />
      </ActionIcon>
    </Group>
  );
}

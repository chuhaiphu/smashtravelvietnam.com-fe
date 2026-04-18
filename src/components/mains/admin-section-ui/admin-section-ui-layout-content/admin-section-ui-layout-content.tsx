'use client';

import { Group, Text } from '@mantine/core';
import classes from './admin-section-ui-layout-content.module.scss';

interface AdminSectionUILayoutContentProps {
  children: React.ReactNode;
}

export default function AdminSectionUILayoutContent({
  children,
}: AdminSectionUILayoutContentProps) {
  return (
    <div className={classes.adminSectionUILayoutRoot}>
      <Group className={classes.pageHeader} justify="space-between">
        <Text size="xl">Section UI</Text>
      </Group>
      {children}
    </div>
  );
}

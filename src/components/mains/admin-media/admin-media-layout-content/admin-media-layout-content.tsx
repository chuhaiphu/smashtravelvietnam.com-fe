'use client';

import { Group, Tabs, TabsList, TabsPanel, TabsTab, Text } from '@mantine/core';
import classes from './admin-media-layout-content.module.scss';
import { usePathname, useRouter } from 'next/navigation';
import { Route } from 'next';

interface AdminMediaLayoutContentProps {
  children: React.ReactNode;
}

export default function AdminMediaLayoutContent({ children }: AdminMediaLayoutContentProps) {
  const router = useRouter();
  const pathname = usePathname();

  const getActiveTab = () => {
    if (pathname === '/adminup/media/upload') return 'upload';
    if (pathname.includes('/adminup/media/images')) return 'images';
    return 'upload';
  };

  const activeTab = getActiveTab();

  const handleTabChange = (value: string | null) => {
    if (!value) return;
    const basePath = '/adminup/media';
    router.push(`${basePath}/${value}` as Route);
  };

  return (
    <div className={classes.adminMediaPageRoot}>
      <Group className={classes.pageHeader} justify="space-between">
        <Text size="xl">Media</Text>
      </Group>
      <div className={classes.tabsWrapper}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          classNames={{
            list: classes.tabsList,
            tab: classes.tabsTab,
            panel: classes.tabsPanel,
            tabLabel: classes.tabLabel,
          }}
        >
          <TabsList>
            <TabsTab value="upload">Uploads</TabsTab>
            <TabsTab value="images">Available Images</TabsTab>
          </TabsList>
          <TabsPanel value="upload" pt="lg">
            {children}
          </TabsPanel>
          <TabsPanel value="images" pt="lg">
            {children}
          </TabsPanel>
        </Tabs>
      </div>
    </div>
  );
}

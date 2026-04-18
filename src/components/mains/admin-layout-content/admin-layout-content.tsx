'use client';

import { AppShell, AppShellMain } from '@mantine/core';
import { useLayoutSiderStore } from '@/libs/zustand/layout-sider-store';
import React, { use } from 'react';
import DashboardSidebar from '@/components/sidebars/dashboard-sidebar/dashboard-sidebar';
import { DashboardHeader } from '@/components/headers/dashboard-header/dashboard-header';
import { IUserResponse } from '@/interfaces/user-interface';
import { ActionResponse } from '@/interfaces/_base-interface';
import { redirect } from 'next/navigation';
import classes from './admin-layout-content.module.scss';

interface AdminLayoutContentProps {
  userPromise: Promise<ActionResponse<IUserResponse>>;
  children: React.ReactNode;
}

export default function AdminLayoutContent({ children, userPromise }: AdminLayoutContentProps) {
  const { collapsed } = useLayoutSiderStore();
  const result = use(userPromise);

  if (!result.success || !result.data) {
    redirect('/login?invalid=1');
  }

  const userData = result.data;

  return (
    <AppShell
      layout="alt"
      header={{ height: 56 }}
      navbar={{
        width: '16rem',
        breakpoint: 'sm',
        collapsed: { mobile: collapsed },
      }}
    >
      <DashboardSidebar userData={userData} />
      <DashboardHeader userData={userData} />
      <AppShellMain miw={1080} classNames={{ main: classes.mainRoot }}>
        {children}
      </AppShellMain>
    </AppShell>
  );
}

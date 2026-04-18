import AdminMenuLayoutContent from '@/components/mains/admin-menu/admin-menu-layout-content/admin-menu-layout-content';
import { getAllMenusActionPrivate } from '@/actions/menu-action';
import { Loader } from '@mantine/core';
import { Suspense } from 'react';

export default function AdminMenuLayout({ children }: { children: React.ReactNode }) {
  const menusPromise = getAllMenusActionPrivate();

  return (
    <Suspense fallback={<Loader size={48} />}>
      <AdminMenuLayoutContent menusPromise={menusPromise}>
        {children}
      </AdminMenuLayoutContent>
    </Suspense>
  );
}

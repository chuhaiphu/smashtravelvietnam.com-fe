import AdminSectionUILayoutContent from '@/components/mains/admin-section-ui/admin-section-ui-layout-content/admin-section-ui-layout-content';
import { Suspense } from 'react';

export default function AdminSectionUILayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <AdminSectionUILayoutContent>{children}</AdminSectionUILayoutContent>
    </Suspense>
  );
}

import AdminSettingLayoutContent from "@/components/mains/admin-settings/admin-setting-layout-content/admin-setting-layout-content";

export default async function AdminSettingLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminSettingLayoutContent>
      {children}
    </AdminSettingLayoutContent>
  );
}


import AdminSettingSmtpLayoutContent from "@/components/mains/admin-settings/admin-setting-email-smtp-layout-content/admin-setting-email-smtp-layout-content";

export default function AdminSettingSmtpLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminSettingSmtpLayoutContent>
      {children}
    </AdminSettingSmtpLayoutContent>
  );
}
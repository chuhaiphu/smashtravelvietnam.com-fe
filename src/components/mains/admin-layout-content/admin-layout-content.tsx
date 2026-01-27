import { getMeAction } from "@/actions/auth-action";
import AdminLayoutContainer from "@/components/mains/admin-layout-content/admin-layout-content-container/admin-layout-content-container";
import { redirect } from "next/navigation";

interface AdminLayoutContentProps {
  children: React.ReactNode;
}

export default async function AdminLayoutContent({ children }: AdminLayoutContentProps) {
  const result = await getMeAction();

  if (!result.success || !result.data) {
    redirect('/login');
  }

  return (
    <AdminLayoutContainer userData={result.data}>
      {children}
    </AdminLayoutContainer>
  );
}

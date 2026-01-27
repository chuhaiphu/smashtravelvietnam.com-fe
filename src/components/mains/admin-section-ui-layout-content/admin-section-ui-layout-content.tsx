import { getDistinctSectionUICredentialsTypesAction } from "@/actions/section-ui-action";
import AdminSectionUILayoutContentContainer from "./admin-section-ui-layout-content-container/admin-section-ui-layout-content-container";
import classes from "./admin-section-ui-layout-content.module.scss";

interface AdminSectionUILayoutContentProps {
  children: React.ReactNode;
}

export default async function AdminSectionUILayoutContent({ children }: AdminSectionUILayoutContentProps) {
  const typesResponse = await getDistinctSectionUICredentialsTypesAction();
  const types = typesResponse?.data ?? [];

  return (
    <div className={classes.adminSectionUILayoutRoot}>
      <AdminSectionUILayoutContentContainer types={types}>
        {children}
      </AdminSectionUILayoutContentContainer>
    </div>
  );
}

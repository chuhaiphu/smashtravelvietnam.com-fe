import { getAppConfigAction } from '@/actions/app-config-action';
import AdminSettingSeoPageContentContainer from "./admin-setting-seo-page-content-container/admin-setting-seo-page-content-container";

export default async function AdminSettingSeoPageContent() {
  const appConfigResponse = await getAppConfigAction();
  const appConfig = appConfigResponse.data;

  return (
    <AdminSettingSeoPageContentContainer appConfig={appConfig} />
  );
}

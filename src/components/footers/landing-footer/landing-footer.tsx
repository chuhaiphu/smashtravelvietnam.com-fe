import { getAppConfigAction } from '@/actions/app-config-action';
import LandingFooterContainer from './landing-footer-container';

export default async function LandingFooter() {
  const configResponse = await getAppConfigAction();

  return <LandingFooterContainer config={configResponse.data} />;
}
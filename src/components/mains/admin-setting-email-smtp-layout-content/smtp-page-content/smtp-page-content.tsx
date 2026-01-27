import { getSmtpConfigAction } from '@/actions/smtp-config-action';
import { getMeAction } from '@/actions/auth-action';
import { redirect } from 'next/navigation';
import SmtpPageContentContainer from './smtp-page-content-container/smtp-page-content-container';

export default async function SmtpPageContent() {
  const response = await getSmtpConfigAction();
  const smtpConfig = response.data ?? null;
  const meResult = await getMeAction();

  if (!meResult.success || !meResult.data) {
    redirect('/login');
  }

  return (
    <SmtpPageContentContainer smtpConfig={smtpConfig} userData={meResult.data} />
  );
}

import SmtpPageContent from '@/components/mains/admin-settings/admin-setting-email-smtp-layout-content/smtp-page-content/smtp-page-content';
import { getSmtpConfigActionPrivate } from '@/actions/smtp-config-action';
import { getMeActionPrivate } from '@/actions/auth-action';
import { Loader } from '@mantine/core';
import { Suspense } from 'react';

export default function EmailSmtpPage() {
  const smtpConfigPromise = getSmtpConfigActionPrivate();
  const userDataPromise = getMeActionPrivate();

  return (
    <Suspense fallback={<Loader />}>
      <SmtpPageContent
        smtpConfigPromise={smtpConfigPromise}
        userDataPromise={userDataPromise}
      />
    </Suspense>
  );
}

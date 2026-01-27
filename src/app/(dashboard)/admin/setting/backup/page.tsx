import BackupPageContent from './backup-page-content';

export default function BackupPage() {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID!;
  const scope =
    process.env.GOOGLE_OAUTH_SCOPE ||
    'https://www.googleapis.com/auth/drive.file';
  const redirectUri =
    process.env.GOOGLE_OAUTH_REDIRECT_URI ||
    `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/admin/setting/backup`;

  return (
    <BackupPageContent
      clientId={clientId}
      scope={scope}
      redirectUri={redirectUri}
    />
  );
}

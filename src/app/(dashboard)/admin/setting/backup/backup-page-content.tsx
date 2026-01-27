'use client';

import { useEffect, useState, useTransition } from 'react';
import { Button, TextInput, Stack, Text, Loader, Alert } from '@mantine/core';
import { createBackupWithOAuthAction } from '@/actions/backup-action';

function parseHashParams(hash: string): Record<string, string> {
  const result: Record<string, string> = {};
  const query = hash.startsWith('#') ? hash.substring(1) : hash;
  for (const part of query.split('&')) {
    const [k, v] = part.split('=');
    if (k) result[decodeURIComponent(k)] = decodeURIComponent(v || '');
  }
  return result;
}

interface BackupPageContentProps {
  clientId: string;
  scope: string;
  redirectUri: string;
}

export default function BackupPageContent({
  clientId,
  scope,
  redirectUri: serverRedirectUri,
}: BackupPageContentProps) {

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [folderId, setFolderId] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Use dynamic redirect URI based on current origin, fallback to server-provided value
  const redirectUri =
    typeof window !== 'undefined'
      ? `${window.location.origin}/admin/setting/backup`
      : serverRedirectUri;

  // Parse access_token from URL hash after Google redirects back
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash;
    if (hash.includes('access_token')) {
      const params = parseHashParams(hash);
      if (params['access_token']) {
        startTransition(() => {
          setAccessToken(params['access_token']);
        });
        // Clean hash from URL
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname + window.location.search
        );
      }
    }
  }, []);

  const handleLogin = () => {
    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    authUrl.searchParams.set('client_id', clientId);
    authUrl.searchParams.set('redirect_uri', redirectUri);
    authUrl.searchParams.set('response_type', 'token');
    authUrl.searchParams.set('scope', scope);
    authUrl.searchParams.set('include_granted_scopes', 'true');
    authUrl.searchParams.set('prompt', 'consent');

    window.location.href = authUrl.toString();
  };

  const handleBackup = () => {
    if (!accessToken || !folderId) {
      setError('Missing access token or folder ID');
      return;
    }

    setMessage(null);
    setError(null);

    startTransition(async () => {
      const result = await createBackupWithOAuthAction(accessToken, folderId);
      if (result.success) {
        setMessage(result.message);
      } else {
        setError(result.message);
      }
    });
  };

  return (
    <Stack gap="md">
      <Text fw={600} size="lg">
        Backup to Google Drive
      </Text>

      {!accessToken && (
        <Button onClick={handleLogin}>Login with Google</Button>
      )}

      {accessToken && (
        <>
          <Alert color="green" title="Already logged in Google">
            <Text size="sm">
              Already got access token from Google. Enter Folder ID where you want to save backup.
            </Text>
          </Alert>

          <TextInput
            label="Google Drive Folder ID"
            placeholder="Enter your Google Drive Folder ID"
            value={folderId}
            onChange={(e) => setFolderId(e.currentTarget.value)}
          />

          <Button onClick={handleBackup} disabled={isPending || !folderId}>
            {isPending ? <Loader size="sm" /> : 'Start Backup'}
          </Button>
        </>
      )}

      {message && (
        <Alert color="green" title="Success">
          {message}
        </Alert>
      )}

      {error && (
        <Alert color="red" title="Error">
          {error}
        </Alert>
      )}
    </Stack>
  );
}

## Backup Configuration to Google Drive (Personal Gmail via OAuth)

The backup feature allows you to backup deployment files to your personal Google Drive (Gmail) through OAuth, without using a Service Account.

### 1. Create OAuth Client on Google Cloud

1. Go to Google Cloud Console.
2. Create or select a project.
3. Enable **Google Drive API**.
4. Navigate to **APIs & Services → Credentials → Create Credentials → OAuth client ID**.
5. Application type: **Web application**.
6. Add `Authorized JavaScript origins` (required):
   - Dev: `http://localhost:3000`
   - Prod: `https://smashtravelvietnam.com`
   - ⚠️ Only enter the root domain, no path, no trailing slash.
7. Add `Authorized redirect URI`:
   - Dev: `http://localhost:3000/admin/setting/backup`
   - Prod: `https://smashtravelvietnam.com/admin/setting/backup`

Copy the **Client ID**.

### 2. Add Environment Variables

In `.env`:

```env
NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID=your_client_id.apps.googleusercontent.com
NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URI=http://localhost:3000/admin/setting/backup
NEXT_PUBLIC_GOOGLE_OAUTH_SCOPE=https://www.googleapis.com/auth/drive.file
```

> **Note**: In the code, the redirect URI is automatically calculated from `window.location.origin`, so the `NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URI` variable is only a fallback. When deploying to production, ensure the redirect URI in Google Cloud Console matches the actual domain.

### 3. Usage in Admin

1. Log in to the Admin page.
2. Go to **Settings → Backup** (or from **Settings → Overview**, click the **Backup & Deploy Guide** button).
3. On the backup page, click **"Login with Google"**:
   - You will be redirected to `/admin/setting/backup`.
4. Click **"Login with Google"**, select the correct Gmail account, and accept the Drive scope.
5. After redirecting back, the system automatically retrieves the `access_token`.
6. Enter the **Folder ID** of the Google Drive folder where you want to save the backup:
   - Open the folder on Google Drive → copy the `{FOLDER_ID}` part from the URL `https://drive.google.com/drive/folders/{FOLDER_ID}`.
7. Click **"Start Backup"** to run the backup.

### 4. Files Backed Up

- `Dockerfile`
- `start.sh`
- `deploy.yml` (GitHub Actions)
- `package.json`
- `.gitignore`
- `.env.example` (template)
- `DEPLOY_GUIDE.md` (detailed deployment guide)

### 5. Notes & Troubleshooting

- All files are uploaded using your **personal Gmail account** (OAuth), and the quota counts toward your personal Drive.
- If backup fails:
  - Check if you have accepted Google Drive permissions.
  - Verify that the Folder ID is entered correctly.
  - If the access token has expired, reload the page and click **"Login with Google"** again.

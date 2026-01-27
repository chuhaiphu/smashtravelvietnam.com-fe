'use server';

import { generateDeployGuide } from '@/libs/backup/deploy-guide-template';
import * as fs from 'fs/promises';
import * as path from 'path';
import { Readable } from 'stream';
import { google, drive_v3 } from 'googleapis';

export interface BackupResult {
  success: boolean;
  message: string;
  folderLink?: string;
  uploadedFiles?: string[];
  errors?: string[];
}

interface BackupFile {
  name: string;
  path: string;
  required: boolean;
}

// List of files to backup
const BACKUP_FILES: BackupFile[] = [
  { name: 'Dockerfile', path: 'Dockerfile', required: true },
  { name: 'docker-compose.yml', path: 'docker-compose.yml', required: true },
  { name: 'start.sh', path: 'start.sh', required: true },
  { name: 'deploy.yml', path: '.github/workflows/deploy.yml', required: true },
  { name: 'package.json', path: 'package.json', required: true },
  { name: '.gitignore', path: '.gitignore', required: false },
];

/**
 * Get the root directory of the project
 */
function getProjectRoot(): string {
  // In production, process.cwd() should give us the project root
  return process.cwd();
}

/**
 * Read a file and return its content as a Buffer
 */
async function readFileContent(filePath: string): Promise<Buffer | null> {
  try {
    const content = await fs.readFile(filePath);
    return content;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
}

/**
 * Get MIME type based on file extension
 */
function getMimeType(fileName: string): string {
  const ext = path.extname(fileName).toLowerCase();
  const mimeTypes: Record<string, string> = {
    '.ts': 'text/typescript',
    '.tsx': 'text/typescript',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.yml': 'text/yaml',
    '.yaml': 'text/yaml',
    '.md': 'text/markdown',
    '.sh': 'application/x-sh',
    '.sql': 'application/sql',
    '.prisma': 'text/plain',
    '.env': 'text/plain',
    '': 'text/plain', // Dockerfile
  };
  return mimeTypes[ext] || 'application/octet-stream';
}

/**
 * Internal helper: run backup logic using a provided Google Drive client and parent folder
 */
async function runBackupWithDriveClient(
  drive: drive_v3.Drive,
  parentFolderId: string
): Promise<BackupResult> {
  const uploadedFiles: string[] = [];
  const errors: string[] = [];
  const projectRoot = getProjectRoot();

  try {
    // Create a sub-folder with timestamp inside the provided parent folder
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const folderName = `Backup_${timestamp}`;

    const folderRes = await drive.files.create({
      requestBody: {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [parentFolderId],
      },
      fields: 'id, name, webViewLink',
    });

    const backupFolderId = folderRes.data.id;

    if (!backupFolderId) {
      return {
        success: false,
        message: 'Không tạo được folder backup trên Google Drive',
        errors: ['Missing backup folder id'],
      };
    }

    // Upload each file
    for (const file of BACKUP_FILES) {
      const fullPath = path.join(projectRoot, file.path);
      console.log(`📄 Processing: ${file.name} from ${fullPath}`);

      const content = await readFileContent(fullPath);

      if (!content) {
        if (file.required) {
          errors.push(`Required file not found: ${file.name}`);
        }
        continue;
      }

      const stream = new Readable();
      stream.push(content);
      stream.push(null);

      try {
        await drive.files.create({
          requestBody: {
            name: file.name,
            parents: [backupFolderId],
          },
          media: {
            mimeType: getMimeType(file.name),
            body: stream,
          },
          fields: 'id, name, webViewLink',
        });
        uploadedFiles.push(file.name);
        console.log(`✅ Uploaded: ${file.name}`);
      } catch (e) {
        const message = e instanceof Error ? e.message : 'unknown error';
        console.error(`❌ Failed to upload ${file.name}:`, message);
        errors.push(`Failed to upload ${file.name}: ${message}`);
      }
    }

    // Generate and upload the deploy guide
    console.log('📝 Generating deploy guide (OAuth flow)...');
    const deployGuide = generateDeployGuide('smashtravelvietnam.com');
    const guideStream = new Readable();
    guideStream.push(deployGuide);
    guideStream.push(null);

    try {
      await drive.files.create({
        requestBody: {
          name: 'DEPLOY_GUIDE.md',
          parents: [backupFolderId],
        },
        media: {
          mimeType: 'text/markdown',
          body: guideStream,
        },
        fields: 'id, name, webViewLink',
      });
      uploadedFiles.push('DEPLOY_GUIDE.md');
      console.log('✅ Deploy guide uploaded (OAuth flow)');
    } catch (e) {
      const message = e instanceof Error ? e.message : 'unknown error';
      console.error('❌ Failed to upload deploy guide (OAuth):', message);
      errors.push(`Failed to upload deploy guide: ${message}`);
    }

    // Create .env.example file
    const envExample = `# Docker
DOCKER_IMAGE=your-dockerhub-username/smashtravelvietnam.com
DOCKER_CONTAINER_NAME=nextjs_app
VERSION=1.0.0-alpha

# PostgreSQL
POSTGRES_DB=smashtravel_db
POSTGRES_USER=smashtravel_user
POSTGRES_PASSWORD=your_secure_password_here

# Admin accounts
ADMIN_EMAIL=admin@smashtravelvietnam.com
ADMIN_PASSWORD=your_admin_password
ADMIN_NAME=Admin

SUPADMIN_EMAIL=supadmin@smashtravelvietnam.com
SUPADMIN_PASSWORD=your_supadmin_password
SUPADMIN_NAME=Super Admin
`;

    const envStream = new Readable();
    envStream.push(envExample);
    envStream.push(null);

    try {
      await drive.files.create({
        requestBody: {
          name: '.env.example',
          parents: [backupFolderId],
        },
        media: {
          mimeType: 'text/plain',
          body: envStream,
        },
        fields: 'id, name, webViewLink',
      });
      uploadedFiles.push('.env.example');
      console.log('✅ .env.example uploaded (OAuth flow)');
    } catch (e) {
      const message = e instanceof Error ? e.message : 'unknown error';
      console.error('❌ Failed to upload .env.example (OAuth):', message);
      errors.push(`Failed to upload .env.example: ${message}`);
    }

    const hasErrors = errors.length > 0;

    return {
      success: !hasErrors,
      message: hasErrors
        ? `Backup completed with ${errors.length} error(s). Uploaded ${uploadedFiles.length} files.`
        : `Backup successfully! Uploaded ${uploadedFiles.length} files.`,
      folderLink: folderRes.data.webViewLink || undefined,
      uploadedFiles,
      errors: hasErrors ? errors : undefined,
    };
  } catch (error) {
    console.error('Backup (OAuth) error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error occurred during backup';
    return {
      success: false,
      message,
      uploadedFiles,
      errors: [message],
    };
  }
}

/**
 * Server action: backup using OAuth access token + chosen folder id (Gmail cá nhân)
 */
export async function createBackupWithOAuthAction(
  accessToken: string,
  folderId: string
): Promise<BackupResult> {
  if (!accessToken || !folderId) {
    return {
      success: false,
      message: 'Thiếu access token hoặc folder ID',
      errors: ['Missing access token or folder ID'],
    };
  }

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });

  const drive = google.drive({ version: 'v3', auth: oauth2Client });

  return runBackupWithDriveClient(drive, folderId);
}


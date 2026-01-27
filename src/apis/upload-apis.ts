import { api } from "./_base";

export interface UploadResponse {
  url: string;
  filename: string;
}

export async function uploadFileApi(file: File, folder?: string) {
  const formData = new FormData();
  formData.append('file', file);
  const queryString = folder ? `?folder=${encodeURIComponent(folder)}` : '';
  return api<UploadResponse>(`/admin/upload${queryString}`, {
    method: 'POST',
    body: formData,
  });
}

export async function uploadMultipleFilesApi(files: File[], folder?: string) {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('files', file);
  });
  const queryString = folder ? `?folder=${encodeURIComponent(folder)}` : '';
  return api<UploadResponse[]>(`/admin/upload/multiple${queryString}`, {
    method: 'POST',
    body: formData,
  });
}

export async function deleteUploadedFileApi(relativePath: string) {
  return api<void>(`/admin/upload`, {
    method: 'DELETE',
    body: JSON.stringify({path: relativePath}),
  });
}

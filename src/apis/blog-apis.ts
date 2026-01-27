import { ICreateBlog, IBlogResponse, IUpdateBlog } from "@/interfaces/blog-interface";
import { api } from "./_base";

export interface BlogFilterParams {
  visibility?: string;
}

function buildQueryString(filter?: BlogFilterParams): string {
  if (!filter) return '';
  const params = new URLSearchParams();
  if (filter.visibility) params.append('visibility', filter.visibility);
  const query = params.toString();
  return query ? `?${query}` : '';
}

// ==================== PUBLIC ROUTES ====================

export async function getAllPublicBlogsApi(filter?: BlogFilterParams) {
  const queryString = buildQueryString(filter);
  return api<IBlogResponse[]>(`/blogs${queryString}`, {
    method: 'GET',
  });
}

export async function getBlogByEndpointApi(endpoint: string) {
  return api<IBlogResponse>(`/blogs/${endpoint}`, {
    method: 'GET',
  });
}

export async function incrementBlogViewApi(id: string) {
  return api<{ recorded: boolean }>(`/blogs/${id}/view`, {
    method: 'POST',
  });
}

export async function toggleBlogLikeApi(id: string) {
  return api<{ liked: boolean }>(`/blogs/${id}/like`, {
    method: 'POST',
  });
}

// ==================== ADMIN ROUTES ====================

export async function createBlogApi(data: ICreateBlog) {
  return api<IBlogResponse>('/blogs/admin', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getAllBlogsAdminApi(filter?: BlogFilterParams) {
  const queryString = buildQueryString(filter);
  return api<IBlogResponse[]>(`/blogs/admin/list${queryString}`, {
    method: 'GET',
  });
}

export async function getBlogByIdApi(id: string) {
  return api<IBlogResponse>(`/blogs/admin/${id}`, {
    method: 'GET',
  });
}

export async function updateBlogApi(id: string, data: IUpdateBlog) {
  return api<IBlogResponse>(`/blogs/admin/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteBlogApi(id: string) {
  return api<void>(`/blogs/admin/${id}`, {
    method: 'DELETE',
  });
}

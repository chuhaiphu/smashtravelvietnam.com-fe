import { ICreateBlogCategory, IBlogCategoryResponse, IUpdateBlogCategory } from "@/interfaces/blog-category-interface";
import { api } from "./_base";

// ==================== PUBLIC ROUTES ====================

export async function getAllPublicBlogCategoriesApi() {
  return api<IBlogCategoryResponse[]>('/blog-categories', {
    method: 'GET',
  });
}

export async function getBlogCategoryByEndpointApi(endpoint: string) {
  return api<IBlogCategoryResponse>(`/blog-categories/${endpoint}`, {
    method: 'GET',
  });
}

// ==================== ADMIN ROUTES ====================

export async function createBlogCategoryApi(data: ICreateBlogCategory) {
  return api<IBlogCategoryResponse>('/blog-categories/admin', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getAllBlogCategoriesAdminApi() {
  return api<IBlogCategoryResponse[]>('/blog-categories/admin/list', {
    method: 'GET',
  });
}

export async function getBlogCategoryByIdApi(id: string) {
  return api<IBlogCategoryResponse>(`/blog-categories/admin/${id}`, {
    method: 'GET',
  });
}

export async function updateBlogCategoryApi(id: string, data: IUpdateBlogCategory) {
  return api<IBlogCategoryResponse>(`/blog-categories/admin/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteBlogCategoryApi(id: string) {
  return api<void>(`/blog-categories/admin/${id}`, {
    method: 'DELETE',
  });
}

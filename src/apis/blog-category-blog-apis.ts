import {
  ICreateBlogCategoryBlog,
  IBlogCategoryBlogResponse,
  IUpdateBlogCategoryBlog
} from "@/interfaces/blog-category-blog-interface";
import { api } from "./_base";

// Public GET (no auth)
export async function getAllBlogCategoryBlogsApi() {
  return api<IBlogCategoryBlogResponse[]>('/blog-category-blogs', { method: 'GET' });
}

export async function getBlogCategoryBlogByIdApi(id: string) {
  return api<IBlogCategoryBlogResponse>(`/blog-category-blogs/${id}`, { method: 'GET' });
}

export async function getBlogCategoryBlogsByBlogIdApi(blogId: string) {
  return api<IBlogCategoryBlogResponse[]>(`/blog-category-blogs/blog/${blogId}`, { method: 'GET' });
}

export async function getBlogCategoryBlogsByBlogCategoryIdApi(blogCategoryId: string) {
  return api<IBlogCategoryBlogResponse[]>(`/blog-category-blogs/category/${blogCategoryId}`, { method: 'GET' });
}

// Admin (auth)
export async function createBlogCategoryBlogApi(data: ICreateBlogCategoryBlog) {
  return api<IBlogCategoryBlogResponse>('/blog-category-blogs/admin', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateBlogCategoryBlogApi(id: string, data: IUpdateBlogCategoryBlog) {
  return api<IBlogCategoryBlogResponse>(`/blog-category-blogs/admin/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteBlogCategoryBlogApi(id: string) {
  return api<void>(`/blog-category-blogs/admin/${id}`, { method: 'DELETE' });
}

export async function deleteBlogCategoryBlogsByBlogIdApi(blogId: string) {
  return api<void>(`/blog-category-blogs/admin/blog/${blogId}`, { method: 'DELETE' });
}

export async function deleteBlogCategoryBlogsByBlogCategoryIdApi(blogCategoryId: string) {
  return api<void>(`/blog-category-blogs/admin/category/${blogCategoryId}`, { method: 'DELETE' });
}

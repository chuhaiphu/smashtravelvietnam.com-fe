import {
  ICreateBlogCategoryBlog,
  IBlogCategoryBlogResponse,
  IUpdateBlogCategoryBlog
} from "@/interfaces/blog-category-blog-interface";
import { api } from "./_base";

// Note: These endpoints need to be implemented in the backend

export async function createBlogCategoryBlogApi(data: ICreateBlogCategoryBlog) {
  return api<IBlogCategoryBlogResponse>('/admin/blog-category-blogs', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getBlogCategoryBlogByIdApi(id: string) {
  return api<IBlogCategoryBlogResponse>(`/admin/blog-category-blogs/${id}`, {
    method: 'GET',
  });
}

export async function getBlogCategoryBlogsByBlogIdApi(blogId: string) {
  return api<IBlogCategoryBlogResponse[]>(`/admin/blog-category-blogs/blog/${blogId}`, {
    method: 'GET',
  });
}

export async function getBlogCategoryBlogsByBlogCategoryIdApi(blogCategoryId: string) {
  return api<IBlogCategoryBlogResponse[]>(`/admin/blog-category-blogs/category/${blogCategoryId}`, {
    method: 'GET',
  });
}

export async function getAllBlogCategoryBlogsApi() {
  return api<IBlogCategoryBlogResponse[]>('/admin/blog-category-blogs', {
    method: 'GET',
  });
}

export async function updateBlogCategoryBlogApi(id: string, data: IUpdateBlogCategoryBlog) {
  return api<IBlogCategoryBlogResponse>(`/admin/blog-category-blogs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteBlogCategoryBlogApi(id: string) {
  return api<void>(`/admin/blog-category-blogs/${id}`, {
    method: 'DELETE',
  });
}

export async function deleteBlogCategoryBlogsByBlogIdApi(blogId: string) {
  return api<void>(`/admin/blog-category-blogs/blog/${blogId}`, {
    method: 'DELETE',
  });
}

export async function deleteBlogCategoryBlogsByBlogCategoryIdApi(blogCategoryId: string) {
  return api<void>(`/admin/blog-category-blogs/category/${blogCategoryId}`, {
    method: 'DELETE',
  });
}

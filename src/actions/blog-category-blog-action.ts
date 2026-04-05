'use server';

import { ActionResponse } from '@/interfaces/_base-interface';
import {
  ICreateBlogCategoryBlog,
  IBlogCategoryBlogResponse,
  IUpdateBlogCategoryBlog
} from '@/interfaces/blog-category-blog-interface';
import { revalidatePath } from 'next/cache';
import { executeApi } from '@/actions/_base';
import {
  createBlogCategoryBlogApiPrivate,
  getBlogCategoryBlogByIdApiPublic,
  getBlogCategoryBlogsByBlogIdApiPublic,
  getBlogCategoryBlogsByBlogCategoryIdApiPublic,
  getAllBlogCategoryBlogsApiPublic,
  updateBlogCategoryBlogApiPrivate,
  deleteBlogCategoryBlogApiPrivate,
  deleteBlogCategoryBlogsByBlogIdApiPrivate,
  deleteBlogCategoryBlogsByBlogCategoryIdApiPrivate,
} from '@/apis/blog-category-blog-apis';

export async function createBlogCategoryBlogActionPrivate(
  input: ICreateBlogCategoryBlog
): Promise<ActionResponse<IBlogCategoryBlogResponse>> {
  const result = await executeApi(
    async () => createBlogCategoryBlogApiPrivate(input)
  );
  revalidatePath('/', 'layout');
  return result;
}

export async function getBlogCategoryBlogByIdActionPublic(
  id: string
): Promise<ActionResponse<IBlogCategoryBlogResponse>> {
  return executeApi(
    async () => getBlogCategoryBlogByIdApiPublic(id)
  );
}

export async function getBlogCategoryBlogsByBlogIdActionPublic(
  blogId: string
): Promise<ActionResponse<IBlogCategoryBlogResponse[]>> {
  return executeApi(
    async () => getBlogCategoryBlogsByBlogIdApiPublic(blogId)
  );
}

export async function getBlogCategoryBlogsByBlogCategoryIdActionPublic(
  blogCategoryId: string
): Promise<ActionResponse<IBlogCategoryBlogResponse[]>> {
  return executeApi(
    async () => getBlogCategoryBlogsByBlogCategoryIdApiPublic(blogCategoryId)
  );
}

export async function getAllBlogCategoryBlogsActionPublic(): Promise<ActionResponse<IBlogCategoryBlogResponse[]>> {
  return executeApi(
    async () => getAllBlogCategoryBlogsApiPublic()
  );
}

export async function updateBlogCategoryBlogActionPrivate(
  id: string,
  input: IUpdateBlogCategoryBlog
): Promise<ActionResponse<IBlogCategoryBlogResponse>> {
  const result = await executeApi(
    async () => updateBlogCategoryBlogApiPrivate(id, input)
  );
  revalidatePath('/', 'layout');
  return result;
}

export async function deleteBlogCategoryBlogActionPrivate(
  id: string
): Promise<ActionResponse<void>> {
  const result = await executeApi(
    async () => deleteBlogCategoryBlogApiPrivate(id)
  );
  revalidatePath('/', 'layout');
  return result;
}

export async function deleteBlogCategoryBlogsByBlogIdActionPrivate(
  blogId: string
): Promise<ActionResponse<void>> {
  const result = await executeApi(
    async () => deleteBlogCategoryBlogsByBlogIdApiPrivate(blogId)
  );
  revalidatePath('/', 'layout');
  return result;
}

export async function deleteBlogCategoryBlogsByBlogCategoryIdActionPrivate(
  blogCategoryId: string
): Promise<ActionResponse<void>> {
  const result = await executeApi(
    async () => deleteBlogCategoryBlogsByBlogCategoryIdApiPrivate(blogCategoryId)
  );
  revalidatePath('/', 'layout');
  return result;
}

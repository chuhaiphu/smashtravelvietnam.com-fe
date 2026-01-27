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
  createBlogCategoryBlogApi,
  getBlogCategoryBlogByIdApi,
  getBlogCategoryBlogsByBlogIdApi,
  getBlogCategoryBlogsByBlogCategoryIdApi,
  getAllBlogCategoryBlogsApi,
  updateBlogCategoryBlogApi,
  deleteBlogCategoryBlogApi,
  deleteBlogCategoryBlogsByBlogIdApi,
  deleteBlogCategoryBlogsByBlogCategoryIdApi,
} from '@/apis/blog-category-blog-apis';

export async function createBlogCategoryBlogAction(
  input: ICreateBlogCategoryBlog
): Promise<ActionResponse<IBlogCategoryBlogResponse>> {
  const result = await executeApi(
    async () => createBlogCategoryBlogApi(input)
  );
  revalidatePath('/', 'layout');
  return result;
}

export async function getBlogCategoryBlogByIdAction(
  id: string
): Promise<ActionResponse<IBlogCategoryBlogResponse>> {
  return executeApi(
    async () => getBlogCategoryBlogByIdApi(id)
  );
}

export async function getBlogCategoryBlogsByBlogIdAction(
  blogId: string
): Promise<ActionResponse<IBlogCategoryBlogResponse[]>> {
  return executeApi(
    async () => getBlogCategoryBlogsByBlogIdApi(blogId)
  );
}

export async function getBlogCategoryBlogsByBlogCategoryIdAction(
  blogCategoryId: string
): Promise<ActionResponse<IBlogCategoryBlogResponse[]>> {
  return executeApi(
    async () => getBlogCategoryBlogsByBlogCategoryIdApi(blogCategoryId)
  );
}

export async function getAllBlogCategoryBlogsAction(): Promise<ActionResponse<IBlogCategoryBlogResponse[]>> {
  return executeApi(
    async () => getAllBlogCategoryBlogsApi()
  );
}

export async function updateBlogCategoryBlogAction(
  id: string,
  input: IUpdateBlogCategoryBlog
): Promise<ActionResponse<IBlogCategoryBlogResponse>> {
  const result = await executeApi(
    async () => updateBlogCategoryBlogApi(id, input)
  );
  revalidatePath('/', 'layout');
  return result;
}

export async function deleteBlogCategoryBlogAction(
  id: string
): Promise<ActionResponse<void>> {
  const result = await executeApi(
    async () => deleteBlogCategoryBlogApi(id)
  );
  revalidatePath('/', 'layout');
  return result;
}

export async function deleteBlogCategoryBlogsByBlogIdAction(
  blogId: string
): Promise<ActionResponse<void>> {
  const result = await executeApi(
    async () => deleteBlogCategoryBlogsByBlogIdApi(blogId)
  );
  revalidatePath('/', 'layout');
  return result;
}

export async function deleteBlogCategoryBlogsByBlogCategoryIdAction(
  blogCategoryId: string
): Promise<ActionResponse<void>> {
  const result = await executeApi(
    async () => deleteBlogCategoryBlogsByBlogCategoryIdApi(blogCategoryId)
  );
  revalidatePath('/', 'layout');
  return result;
}

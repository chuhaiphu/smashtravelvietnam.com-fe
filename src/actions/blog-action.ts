'use server';

import { ActionResponse } from '@/interfaces/_base-interface';
import { ICreateBlog, IBlogResponse, IUpdateBlog } from '@/interfaces/blog-interface';
import { revalidatePath } from 'next/cache';
import { executeApi } from '@/actions/_base';
import {
  createBlogApi,
  getBlogByIdApi,
  getBlogByEndpointApi,
  getAllBlogsAdminApi,
  getAllPublicBlogsApi,
  updateBlogApi,
  deleteBlogApi,
  incrementBlogViewApi,
  toggleBlogLikeApi,
} from '@/apis/blog-apis';

export async function createBlogAction(
  input: ICreateBlog
): Promise<ActionResponse<IBlogResponse>> {
  const result = await executeApi(
    async () => createBlogApi(input)
  );
  revalidatePath('/', 'layout');
  return result;
}

export async function getBlogByIdAction(
  id: string
): Promise<ActionResponse<IBlogResponse>> {
  return executeApi(
    async () => getBlogByIdApi(id)
  );
}

export async function getBlogByEndpointAction(
  endpoint: string
): Promise<ActionResponse<IBlogResponse>> {
  return executeApi(
    async () => getBlogByEndpointApi(endpoint)
  );
}

export async function getAllBlogsAction(): Promise<ActionResponse<IBlogResponse[]>> {
  return executeApi(
    async () => getAllBlogsAdminApi()
  );
}

export async function getAllPublicBlogsAction(): Promise<ActionResponse<IBlogResponse[]>> {
  return executeApi(
    async () => getAllPublicBlogsApi({ visibility: 'PUBLIC' })
  );
}

export async function updateBlogAction(
  id: string,
  input: IUpdateBlog
): Promise<ActionResponse<IBlogResponse>> {
  const result = await executeApi(
    async () => updateBlogApi(id, input)
  );
  revalidatePath('/', 'layout');
  return result;
}

export async function deleteBlogAction(
  id: string
): Promise<ActionResponse<void>> {
  const result = await executeApi(
    async () => deleteBlogApi(id)
  );
  revalidatePath('/', 'layout');
  return result;
}

export async function incrementBlogViewAction(
  blogId: string
): Promise<ActionResponse<boolean>> {
  const result = await executeApi(
    async () => incrementBlogViewApi(blogId)
  );
  return {
    success: result.success,
    data: result.data?.recorded ?? false,
    error: result.error,
  };
}

export async function incrementBlogLikeAction(
  blogId: string
): Promise<ActionResponse<boolean>> {
  const result = await executeApi(
    async () => toggleBlogLikeApi(blogId)
  );
  return {
    success: result.success,
    data: result.data?.liked ?? false,
    error: result.error,
  };
}

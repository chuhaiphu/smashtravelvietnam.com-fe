import { ICreateUser, IUpdatePassword, IUserResponse } from "@/interfaces/user-interface";
import { api } from "./_base";

export async function createUserApi(data: ICreateUser) {
  return api<IUserResponse>('/admin/users', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getAllUsersApi() {
  return api<IUserResponse[]>('/admin/users', {
    method: 'GET',
  });
}

export async function getUserByIdApi(id: string) {
  return api<IUserResponse>(`/admin/users/${id}`, {
    method: 'GET',
  });
}

export async function updateUserApi(id: string, data: Partial<ICreateUser>) {
  return api<IUserResponse>(`/admin/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function updatePasswordApi(data: IUpdatePassword) {
  return api<IUserResponse>(`/admin/users/${data.userId}`, {
    method: 'PUT',
    body: JSON.stringify({ password: data.newPassword }),
  });
}

export async function deleteUserApi(id: string) {
  return api<void>(`/admin/users/${id}`, {
    method: 'DELETE',
  });
}

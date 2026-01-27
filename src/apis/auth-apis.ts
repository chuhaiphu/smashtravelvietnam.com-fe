import { IUserResponse } from "@/interfaces/user-interface";
import { api } from "./_base";

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: IUserResponse;
}

export async function localSignInApi(data: AuthRequest) {
  return api<AuthResponse>('/auth/local', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function logoutApi() {
  return api<void>('/auth/logout', {
    method: 'POST',
  });
}

export async function getMeApi() {
  return api<IUserResponse>('/auth/me', {
    method: 'GET',
  });
}

import { HttpResponse } from "@/interfaces/_base-interface";
import { ApiError } from "@/helpers/classes";
import { parseSetCookie } from "@/helpers/function-helpers";
import { cookies } from "next/headers";

const SMASH_API_URL = process.env.SMASH_API_URL;

if (!SMASH_API_URL) {
  throw new Error("Missing SMASH_API_URL env variable");
}

export async function api<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<HttpResponse<T>> {
  const url = `${SMASH_API_URL}${endpoint}`;

  // take the cookie from browser storage and set it to the request headers
  // because api calls from Next.js server, not from the browser
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const headers: HeadersInit = {
    ...(cookieHeader && { "Cookie": cookieHeader }),
    ...options.headers,
  };

  // FormData donot need to set Content-Type header
  if (!(options.body instanceof FormData)) {
    (headers as Record<string, string>)['Content-Type'] = "application/json";
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  try {
    console.log('url', url);
    const response = await fetch(url, config);
    console.log('response', response);
    // Get set-cookie header from backend response to Next.js server
    // Parse cookie and set it back to browser storage
    // --- Site Notes ---
    // FormData response will return back cookies with empty value
    // So we need to check the cookie value is not empty, otherwise the cookies will be accidentally removed
    const rawSetCookie = response.headers.getSetCookie();
    const parsedCookie = parseSetCookie(rawSetCookie[0]);

    // Set cookies for auth endpoints
    if (endpoint === '/auth/logout') {
      cookieStore.delete('atk');
    } else if (endpoint === '/auth/local') {
      cookieStore.set({
        name: 'atk',
        value: parsedCookie.value,
        httpOnly: parsedCookie.options.httpOnly,
        path: parsedCookie.options.path,
        secure: parsedCookie.options.secure,
        sameSite: parsedCookie.options.sameSite,
        maxAge: parsedCookie.options.maxAge,
        expires: parsedCookie.options.expires,
      });
    }
    const httpResponse: HttpResponse<T> = await response.json();
    return httpResponse;

  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(error instanceof Error ? error.message : 'Unexpected error occurred', "UNKNOWN", 520);
  }
}

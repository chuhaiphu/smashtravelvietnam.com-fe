import slugify from 'slugify';
import { getTourByEndpointAction } from '../actions/tour-action';
import { getTourCategoryByEndpointAction } from '../actions/tour-category-action';
import { getPageByEndpointAction } from '../actions/page-action';
import { getBlogCategoryByEndpointAction } from '@/actions/blog-category-action';
import { ParsedCookie } from './classes';

export const stripHtmlAndTruncate = (html: string, maxLength: number) => {
  const text = html.replace(/<[^>]*>/g, '');
  return text.length > maxLength ? text.substring(0, maxLength) : text;
};

export const validateImageFile = (file: File) => {
  const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  return validTypes.includes(file.type);
}

/**
 * Sanitize endpoint string to only allow URL-safe characters
 * Allows: lowercase letters, numbers, hyphens
 * Removes: dots, underscores, special characters, spaces, etc.
 */
export const sanitizeEndpoint = (input: string): string => {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '') // Remove all except lowercase letters, numbers, hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

export const generateUniqueEndpoint = async (title: string, model: 'tour' | 'landing', currentModelId?: string): Promise<string> => {
  let slugifiedTitle = '';
  if (!title || title.trim().length === 0) {
    slugifiedTitle = 'no-title';
  }
  else {
    slugifiedTitle = title;
  }
  const baseEndpoint = slugify(slugifiedTitle, {
    replacement: '-',
    remove: undefined,
    lower: true,
    strict: false,
    locale: 'vi',
    trim: true
  });

  let endpoint = baseEndpoint;
  let isUnique = false;

  while (!isUnique) {
    if (model === 'tour') {
      // For tour model: only check Tour table
      const existingTour = await getTourByEndpointAction(endpoint);
      const tourConflict = existingTour.success && existingTour.data &&
        existingTour.data.id !== currentModelId;

      if (tourConflict) {
        const randomSuffix = Math.floor(1000 + Math.random() * 9000);
        endpoint = `${baseEndpoint}-${randomSuffix}`;
      } else {
        isUnique = true;
      }
    } else {
      // For landing model: check both TourCategory and Page
      const [existingTourCategory, existingPage, existingBlogCategory] = await Promise.all([
        getTourCategoryByEndpointAction(endpoint),
        getPageByEndpointAction(endpoint),
        getBlogCategoryByEndpointAction(endpoint)
      ]);

      const categoryConflict = existingTourCategory.success && existingTourCategory.data &&
        existingTourCategory.data.id !== currentModelId;

      const pageConflict = existingPage.success && existingPage.data &&
        existingPage.data.id !== currentModelId;

      const blogCategoryConflict = existingBlogCategory.success && existingBlogCategory.data &&
        existingBlogCategory.data.id !== currentModelId;

      if (categoryConflict || pageConflict || blogCategoryConflict) {
        const randomSuffix = Math.floor(1000 + Math.random() * 9000);
        endpoint = `${baseEndpoint}-${randomSuffix}`;
      } else {
        isUnique = true;
      }
    }
  }

  return endpoint;
}

export const formatPrice = (price: number): string => {
  return price.toLocaleString("vi-VN");
}

export function getEmbeddedVideoUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.replace("www.", "");

    // --- YouTube ---
    // Using youtube-nocookie.com (privacy-enhanced mode) to avoid third-party cookies
    // Cookies are only set when the user clicks play
    if (hostname === "youtube.com" || hostname === "youtu.be") {
      // Case: youtu.be/<id>
      if (hostname === "youtu.be") {
        return `https://www.youtube-nocookie.com/embed/${parsed.pathname.slice(1)}`;
      }

      // Case: youtube.com/watch?v=<id>
      const videoId = parsed.searchParams.get("v");
      if (videoId) {
        return `https://www.youtube-nocookie.com/embed/${videoId}`;
      }

      // Case: youtube.com/embed/<id> or youtube-nocookie.com/embed/<id>
      if (parsed.pathname.startsWith("/embed/")) {
        // Convert existing youtube.com embeds to nocookie version
        if (hostname === "youtube.com" || hostname === "www.youtube.com") {
          const videoId = parsed.pathname.split("/embed/")[1]?.split("?")[0];
          if (videoId) {
            return `https://www.youtube-nocookie.com/embed/${videoId}${parsed.search}`;
          }
        }
        // Already using nocookie or other format, return as-is
        return url;
      }
    }

    // --- Vimeo ---
    if (hostname === "vimeo.com") {
      const videoId = parsed.pathname.split("/")[1];
      if (videoId) {
        return `https://player.vimeo.com/video/${videoId}`;
      }
    }

    return null;
  } catch {
    return null;
  }
}

export function isPathActive(pathname: string, itemPath: string, isRoot = false) {
  if (!itemPath) return false;
  // Handle active Root path for NavLink
  if (isRoot) {
    return pathname === itemPath;
  }
  if (pathname === itemPath) return true;
  return pathname.startsWith(itemPath + '/');
}

export const renderDurationDays = (durationDays: number) => {
  if (durationDays === 0.5) {
    return 'Half day';
  }
  if (durationDays === 1) {
    return '1 day';
  }
  return `${durationDays} days`;
}

export function parseSetCookie(setCookie: string | null): ParsedCookie {
  if (!setCookie) {
    return {
      name: '',
      value: '',
      options: {},
    };
  }
  const parts = setCookie.split(';').map(p => p.trim());
  const [nameValue, ...attrs] = parts;
  const [name, value] = nameValue.split('=');
  const options: ParsedCookie['options'] = {};

  for (const attr of attrs) {
    const [key, val] = attr.split('=');

    switch (key.toLowerCase()) {
      case 'max-age':
        options.maxAge = Number(val);
        break;
      case 'path':
        options.path = val;
        break;
      case 'expires':
        options.expires = new Date(val);
        break;
      case 'httponly':
        options.httpOnly = true;
        break;
      case 'samesite':
        options.sameSite = val.toLowerCase() as 'lax' | 'strict' | 'none';
        break;
      case 'secure':
        options.secure = true;
        break;
    }
  }

  return { name, value, options };
}
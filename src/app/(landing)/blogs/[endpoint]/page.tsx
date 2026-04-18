import {
  getAllBlogsActionPublic,
  getBlogByEndpointActionPublic,
} from '@/actions/blog-action';
import LandingBlogDetailPageContent from '@/components/mains/landing-blog/landing-blog-detail-page-content/landing-blog-detail-page-content';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

const BLOG_ENDPOINT_PLACEHOLDER = '__placeholder__';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ endpoint: string }>;
}): Promise<Metadata> {
  const { endpoint } = await params;
  const blogResponse = await getBlogByEndpointActionPublic(endpoint);

  if (!blogResponse.success || !blogResponse.data) {
    return {
      title: 'Blog Not Found',
    };
  }

  const blog = blogResponse.data;
  const description = blog.description
    ? blog.description.replace(/<[^>]*>/g, '').substring(0, 160)
    : 'Discover amazing travel experiences in Vietnam';

  return {
    title: `${blog.title} | Smash Travel Vietnam`,
    description: description,
    openGraph: {
      title: blog.title,
      description: description,
      images: blog.mainImageUrl ? [blog.mainImageUrl] : [],
    },
    alternates: {
      canonical: `https://smashtravelvietnam.com/blogs/${endpoint}`,
    },
  };
}

export async function generateStaticParams() {
  const blogsResponse = await getAllBlogsActionPublic();
  const params =
    blogsResponse.success && blogsResponse.data
      ? blogsResponse.data.map((blog) => ({
          endpoint: blog.endpoint,
        }))
      : [];

  return params.length > 0 ? params : [{ endpoint: BLOG_ENDPOINT_PLACEHOLDER }];
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ endpoint: string }>;
}) {
  const { endpoint } = await params;

  if (endpoint === BLOG_ENDPOINT_PLACEHOLDER) {
    notFound();
  }

  const blogResponse = await getBlogByEndpointActionPublic(endpoint);

  if (!blogResponse.success || !blogResponse.data) {
    notFound();
  }

  return (
    <LandingBlogDetailPageContent blogData={blogResponse.data} endpoint={endpoint} />
  );
}

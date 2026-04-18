import { getBlogCategoryByEndpointActionPublic } from '@/actions/blog-category-action';
import LandingBlogCategoryPage from '@/components/mains/landing-blog/landing-blog-category-page/landing-blog-category-page';
import SearchBar from '@/components/primitives/search-bar/search-bar';
import LandingTourCategoryPage from '@/components/mains/landing-tour/landing-tour-category-page/landing-tour-category-page';
import { getTourCategoryByEndpointActionPublic } from '@/actions/tour-category-action';
import { Suspense } from 'react';
import { Loader } from '@mantine/core';
import LandingPageContent from '@/components/mains/landing-page/landing-page-content';

export default async function LandingDynamicRouteContent({
  params,
  searchParams,
}: {
  params: Promise<{ endpoint: string }>;
  searchParams: Promise<{ q?: string; type?: string; destinations?: string }>;
}) {
  const { endpoint } = await params;
  const queryParams = await searchParams;

  const blogCategoryResponse = await getBlogCategoryByEndpointActionPublic(endpoint);
  if (blogCategoryResponse.success && blogCategoryResponse.data) {
    return (
      <>
        <Suspense fallback={<Loader size={64} />}>
          <SearchBar searchType="blog" />
        </Suspense>
        <Suspense fallback={<Loader size={64} />}>
          <LandingBlogCategoryPage
            category={blogCategoryResponse.data}
            queryParams={{
              q: queryParams.q,
              destinations: queryParams.destinations,
            }}
          />
        </Suspense>
      </>
    );
  }

  const tourCategoryResponse = await getTourCategoryByEndpointActionPublic(endpoint);
  if (tourCategoryResponse.success && tourCategoryResponse.data) {
    return (
      <>
        <Suspense fallback={<Loader size={64} />}>
          <SearchBar searchType="tour" />
        </Suspense>
        <Suspense fallback={<Loader size={64} />}>
          <LandingTourCategoryPage
            category={tourCategoryResponse.data}
            queryParams={queryParams}
          />
        </Suspense>
      </>
    );
  }

  return (
    <>
      <Suspense fallback={<Loader size={64} />}>
        <SearchBar searchType="tour" />
      </Suspense>
      <Suspense fallback={<Loader size={64} />}>
        <LandingPageContent params={params} />
      </Suspense>
    </>
  );
}

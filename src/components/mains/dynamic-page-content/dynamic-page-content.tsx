import { getBlogCategoryByEndpointAction } from "@/actions/blog-category-action";
import LandingBlogCategory from "@/components/primitives/landing-blog-category/landing-blog-category";
import SearchBar from "@/components/primitives/search-bar/search-bar";
import LandingTourCategory from "@/components/primitives/landing-tour-category/landing-tour-category";
import { notFound } from "next/navigation";
import { getTourCategoryByEndpointAction } from "@/actions/tour-category-action";
import { getPageByEndpointAction } from "@/actions/page-action";
import LandingPageDetail from "@/components/primitives/landing-page-detail/landing-page-detail";
import { Suspense } from "react";
import { Loader } from "@mantine/core";

export default async function DynamicPageContent({ params, searchParams }: { params: Promise<{ endpoint: string }>, searchParams: Promise<{ q?: string; type?: string; destinations?: string }> }) {
  const { endpoint } = await params;
  const queryParams = await searchParams;

  // If endpoint is a blog category, return the blog category page
  const blogCategoryResponse = await getBlogCategoryByEndpointAction(endpoint);
  if (blogCategoryResponse.success && blogCategoryResponse.data) {
    return (
      <>
        <Suspense fallback={<Loader size={64} />}>
          <SearchBar searchType="blog" />
        </Suspense>
        <Suspense fallback={<Loader size={64} />}>
          <LandingBlogCategory
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

  // If endpoint is a tour category, return the tour category page
  const tourCategoryResponse = await getTourCategoryByEndpointAction(endpoint);
  if (tourCategoryResponse.success && tourCategoryResponse.data) {
    return (
      <>
        <Suspense fallback={<Loader size={64} />}>
          <SearchBar searchType="tour" />
        </Suspense>
        <Suspense fallback={<Loader size={64} />}>
          <LandingTourCategory
            category={tourCategoryResponse.data}
            queryParams={queryParams}
          />
        </Suspense>
      </>
    );
  }

  // If endpoint is a page, return the page detail page
  const pageResponse = await getPageByEndpointAction(endpoint);
  if (pageResponse.success && pageResponse.data) {
    return (
      <>
        <Suspense fallback={<Loader size={64} />}>
          <SearchBar searchType="tour" />
        </Suspense>
        <Suspense fallback={<Loader size={64} />}>
          <LandingPageDetail page={pageResponse.data} />
        </Suspense>
      </>
    );
  }

  // Neither found
  notFound();
}
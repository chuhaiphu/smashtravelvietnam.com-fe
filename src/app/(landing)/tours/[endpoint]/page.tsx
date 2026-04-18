import {
  getAllToursActionPublic,
  getTourByEndpointActionPublic,
} from '@/actions/tour-action';
import LandingTourDetailPageContent from '@/components/mains/landing-tour/landing-tour-detail-page-content/landing-tour-detail-page-content';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAppConfigActionPublic } from '@/actions/app-config-action';

const TOUR_ENDPOINT_PLACEHOLDER = '__placeholder__';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ endpoint: string }>;
}): Promise<Metadata> {
  const { endpoint } = await params;
  const tourResponse = await getTourByEndpointActionPublic(endpoint);

  if (!tourResponse.success || !tourResponse.data) {
    return {
      title: 'Tour Not Found',
    };
  }

  const tour = tourResponse.data;
  const description = tour.description
    ? tour.description.replace(/<[^>]*>/g, '').substring(0, 300)
    : tour.destinations?.join(', ') || 'Vietnam';

  return {
    title: tour.title,
    description: description,
    openGraph: {
      title: tour.title,
      description: description,
      images: tour.mainImageUrl ? [tour.mainImageUrl] : [],
    },
    alternates: {
      canonical: `https://smashtravelvietnam.com/tours/${endpoint}`,
    },
  };
}

export async function generateStaticParams() {
  const toursResponse = await getAllToursActionPublic();
  const params =
    toursResponse.success && toursResponse.data
      ? toursResponse.data.map((tour) => ({
          endpoint: tour.endpoint,
        }))
      : [];

  return params.length > 0 ? params : [{ endpoint: TOUR_ENDPOINT_PLACEHOLDER }];
}

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ endpoint: string }>;
}) {
  const { endpoint } = await params;

  if (endpoint === TOUR_ENDPOINT_PLACEHOLDER) {
    notFound();
  }

  const tourData = await getTourByEndpointActionPublic(endpoint);
  const configData = await getAppConfigActionPublic();

  if (!tourData.success || !tourData.data) {
    notFound();
  }

  return (
    <LandingTourDetailPageContent
      tourData={tourData.data}
      endpoint={endpoint}
      whatsappPhone={
        configData.success ? configData.data?.phoneContact : undefined
      }
    />
  );
}

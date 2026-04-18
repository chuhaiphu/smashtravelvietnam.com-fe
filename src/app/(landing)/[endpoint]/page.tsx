import LandingDynamicRouteContent from "@/components/mains/landing-page/landing-dynamic-route-content";
import { Loader } from "@mantine/core";
import { Suspense } from "react";

export default async function DynamicEndpointPage({
  params,
  searchParams,
}: {
  params: Promise<{ endpoint: string }>;
  searchParams: Promise<{ q?: string; type?: string; destinations?: string }>;
}) {
  return (
    <Suspense fallback={<Loader size={64} />}>
      <LandingDynamicRouteContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}


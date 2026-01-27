import SearchBar from "@/components/primitives/search-bar/search-bar";
import classes from "./page.module.scss";
import { Container, Group, Loader, Stack, Text } from "@mantine/core";
import VideoSection from "@/components/primitives/video-section/video-section";
import { LandingCarouselV2 } from "@/components/primitives/landing-carousel/v2/landing-carousel-v2";
import GridItemsContainerV1 from "@/components/grids/grid-items-container/v1/grid-items-container-v1";
import GridItemsContainerV2 from "@/components/grids/grid-items-container/v2/grid-items-container-v2";
import Link from "next/link";
import TourGrid from "@/components/grids/tour-grid/tour-grid";
import { getAllPublicToursPinnedToHomeAction } from "@/actions/tour-action";
import { Suspense } from "react";
import DynamicSection from "@/libs/section-ui/dynamic-section";

async function LandingPageTourContent() {
  const toursResponse = await getAllPublicToursPinnedToHomeAction();
  const toursData = toursResponse.data || [];

  return (
    <TourGrid toursData={toursData} />
  );
} 

export default async function LandingPage() {
  return (
    <>
      {/* Position 1: Banner - uses DynamicSection */}
      <DynamicSection position={1} />

      <Container size="xl" classNames={{ root: classes.landingContainer }}>
        <Suspense fallback={<Loader size={48} />}>
          <SearchBar />
        </Suspense>
        <Stack gap="lg" mb={'xl'}>
          <h1 className={classes.pageTitle}>Smash & Travel Vietnam (STV)</h1>
          <Text lh={1.5} pl={54} pr={54} className={classes.pageSubtitle}>Warm greetings from Smash & Travel Vietnam (STV) – a specialized travel brand under Vietnam Incredible Land Tours (VIL), part of Viet Han Trading Co., Ltd, proudly established since 2011...
            {' '}<Link className={classes.seeMoreLink} href="https://smashtravelvietnam.com/about">See more</Link>
          </Text>
        </Stack>
        <Group align="center" justify="space-between">
          <Stack gap={6}>
            <h2 className={classes.sectionTitle}>Vietnam Landtours</h2>
            <h3 className={classes.sectionSubTitle}>Many tours are available to serve you.</h3>
          </Stack>
          {/* <TabBar /> */}
          <Link className={classes.allToursLink} href="/tours">View all</Link>
        </Group>
        <Suspense fallback={<Loader size={48} />}>
          <LandingPageTourContent />
        </Suspense>
        <Stack gap={6} mb={'xl'} mt={56}>
          <h2 className={classes.sectionTitle}>Our locations for you</h2>
          <h3 className={classes.sectionSubTitle}>Vietnam has many beautiful landscapes</h3>
        </Stack>
        <GridItemsContainerV2 />
      </Container>
      <Container size="xl" classNames={{ root: classes.landingContainer }}>
        <Stack gap={6} mb={'xl'}>
          <h2 className={classes.sectionTitle}>Our services</h2>
          <h3 className={classes.sectionSubTitle}>Beside choosing your favorite destinations and tour packages</h3>
        </Stack>
        <GridItemsContainerV1 />
        <Stack gap={6} mb={'xl'}>
          <h2 className={classes.sectionTitle}>We have the best partners</h2>
          <h3 className={classes.sectionSubTitle}>We have the best partners</h3>
        </Stack>
      </Container>
      <LandingCarouselV2 />
      <VideoSection url="https://www.youtube.com/watch?v=iVIbnK94x4Y" />
    </>
  );
}

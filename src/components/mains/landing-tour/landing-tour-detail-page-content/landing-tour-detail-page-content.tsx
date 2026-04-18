import {
  Grid,
  GridCol,
  Group,
  Paper,
  Stack,
  Text,
  UnstyledButton,
} from '@mantine/core';
import LocationIcon from '@/components/icons/vinaup-location-icon';
import classes from './landing-tour-detail-page-content.module.scss';
import SmileSquareIcon from '@/components/icons/smile-square-icon';
import {
  CarouselSlide,
  LandingCarousel,
} from '@/components/primitives/landing-carousel/landing-carousel';
import VideoSection from '@/components/primitives/video-section/video-section';
import { formatPrice, renderDurationDays } from '@/utils/function-helpers';
import { RiCheckDoubleFill } from 'react-icons/ri';
import { SERVICE_ITEMS } from '@/constants';
import SocialTab from '@/components/primitives/social-tab/social-tab';
import IncrementView from '@/components/primitives/social-tab/increment-view';
import Link from 'next/link';
import Image from 'next/image';
import { ITourResponse } from '@/interfaces/tour-interface';

interface LandingTourDetailPageContentProps {
  tourData: ITourResponse;
  endpoint: string;
  whatsappPhone?: string | null;
}

export default function LandingTourDetailPageContent({
  tourData,
  endpoint,
  whatsappPhone,
}: LandingTourDetailPageContentProps) {
  const additionalImageSlides: CarouselSlide[] = tourData.additionalImageUrls.map(
    (url) => ({
      imageUrl: url,
    })
  );

  const staticServiceSlides: CarouselSlide[] = SERVICE_ITEMS.map((item) => ({
    imageUrl: item.imageUrl,
    titleMain: item.name,
    href: item.endpoint,
  }));

  const renderAdditionalImagesCarousel = () => {
    if (additionalImageSlides.length === 0) {
      return <></>;
    } else {
      return <LandingCarousel slides={additionalImageSlides} height={480} />;
    }
  };

  const renderVideoSection = (
    videoUrl?: string,
    thumbnailUrl?: string,
    title?: string
  ) => {
    if (!videoUrl) {
      return <></>;
    }
    return (
      <VideoSection
        url={videoUrl}
        title={title}
        height={480}
        thumbnailUrl={thumbnailUrl || undefined}
      />
    );
  };

  const renderHTMLDescription = (htmlDescription: string | undefined | null) => {
    if (
      !htmlDescription ||
      htmlDescription.trim() === '' ||
      htmlDescription.trim() === '<p></p>'
    ) {
      return <></>;
    }
    return (
      <Stack gap={2}>
        <Text size="xl" fw={'bold'} c={'var(--vinaup-yellow)'}>
          Overview:
        </Text>
        <div
          dangerouslySetInnerHTML={{ __html: htmlDescription }}
          className={classes.htmlDescription}
        ></div>
      </Stack>
    );
  };

  const renderHTMLContent = (htmlContent: string | undefined | null) => {
    if (
      !htmlContent ||
      htmlContent.trim() === '' ||
      htmlContent.trim() === '<p></p>'
    ) {
      return <></>;
    }
    return (
      <Stack gap={2}>
        <Text size="xl" fw={'bold'} c={'var(--vinaup-yellow)'}>
          Itinerary:
        </Text>
        <div
          dangerouslySetInnerHTML={{ __html: htmlContent }}
          className={classes.htmlContent}
        ></div>
      </Stack>
    );
  };

  const renderPrice = (price: number, discountPrice: number) => {
    if (price === 0) {
      return (
        <Group classNames={{ root: classes.price }} gap={'xs'}>
          <Text c={'#00E1FF'} className={classes.value}>
            Ask for Price
          </Text>
        </Group>
      );
    }

    if (discountPrice === 0) {
      return (
        <Group classNames={{ root: classes.price }} gap={'xs'}>
          <Text c={'#00E1FF'} className={classes.currency}>
            đ
          </Text>
          <Text c={'#00E1FF'} className={classes.value}>
            {formatPrice(price)}
          </Text>
        </Group>
      );
    }

    return (
      <Group classNames={{ root: classes.price }} gap={'xs'}>
        <Text c={'#00E1FF'} className={classes.currency}>
          đ
        </Text>
        <Group gap={'xs'}>
          <Text c={'#00E1FF'} className={classes.value}>
            {formatPrice(discountPrice)}
          </Text>
          <Text td="line-through" c={'white'} className={classes.value}>
            {formatPrice(price)}
          </Text>
        </Group>
      </Group>
    );
  };

  const currentUrl = `https://smashtravelvietnam.com/tours/${endpoint}`;
  const waPhone = whatsappPhone ?? '84912711789';

  return (
    <div className={classes.tourDetailPage}>
      <IncrementView tourId={tourData.id} />
      <Grid
        gutter={'xl'}
        mb={'lg'}
        classNames={{
          root: classes.topInfo,
        }}
      >
        <GridCol span={{ base: 12, sm: 12, md: 8, lg: 8, xl: 8 }}>
          <Stack gap={'sm'} pl={'sm'} pr={'sm'} pt={'sm'}>
            <Text
              c={'#00E1FF'}
              component="h1"
              classNames={{
                root: classes.tourTitle,
              }}
            >
              {tourData.title}
            </Text>
            <SocialTab
              tourId={tourData.id}
              likes={tourData.likes}
              views={tourData.views}
              url={currentUrl}
            />
            <Group justify="space-between" pb={'sm'}>
              <Group gap={4}>
                <LocationIcon size={20} />
                <Text fz={15} c={'white'}>
                  {tourData.destinations.join(', ')}
                </Text>
              </Group>
              <Group gap={'xs'}>
                <Link
                  href={`https://wa.me/${waPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.whatsappLink}
                >
                  <Text fz={'xl'} c={'#60D669'}>
                    Whatsapp
                  </Text>
                  <SmileSquareIcon size={22} />
                </Link>
              </Group>
            </Group>
          </Stack>
        </GridCol>
        <GridCol
          span={{ base: 12, sm: 12, md: 4, lg: 4, xl: 4 }}
          classNames={{
            col: classes.rightCol,
          }}
        >
          <Stack
            gap={'xs'}
            justify="center"
            pl={{ base: 'sm', md: 0 }}
            pr={'sm'}
            pb={'sm'}
            pt={'sm'}
          >
            <Group justify="space-between" align="flex-start">
              <Stack gap={0} align="flex-start">
                <Text className={classes.label} size="md" c={'#F9F9F9'}>
                  Price from
                </Text>
                {renderPrice(tourData.price, tourData.discountPrice)}
              </Stack>
              <Stack gap={0} align="flex-end">
                <Text className={classes.label} size="md" c={'#F9F9F9'}>
                  Duration
                </Text>
                <Text className={classes.duration} size="lg" c={'white'}>
                  {renderDurationDays(tourData.durationDays)}
                </Text>
              </Stack>
            </Group>
            <div className={classes.spacer} />
            <Group justify="space-between" wrap="nowrap" pt={0}>
              <Link href={`/tours/${endpoint}/booking`} className={classes.link}>
                <UnstyledButton
                  classNames={{ root: classes.leftButton }}
                  bg={'#00E1FF'}
                  p={'xs'}
                  bdrs={'md'}
                >
                  Book Now
                </UnstyledButton>
              </Link>
              <Link href={`/customized-tour`} className={classes.link}>
                <UnstyledButton
                  classNames={{ root: classes.rightButton }}
                  c={'#FCBE11'}
                  p={'xs'}
                  bdrs={'md'}
                >
                  Customized Tour
                </UnstyledButton>
              </Link>
            </Group>
          </Stack>
        </GridCol>
      </Grid>
      <Grid
        gutter={'xl'}
        classNames={{
          root: classes.mainContent,
        }}
      >
        <GridCol
          span={{ base: 12, sm: 12, md: 8, lg: 8, xl: 8 }}
          classNames={{
            col: classes.leftCol,
          }}
        >
          {tourData.additionalImagesPosition === 'top' &&
            renderAdditionalImagesCarousel()}
          {tourData.videoPosition === 'top' &&
            renderVideoSection(
              tourData.videoUrl || undefined,
              tourData.videoThumbnailUrl || undefined,
              tourData.title
            )}
          {renderHTMLDescription(tourData.description)}
          {renderHTMLContent(tourData.content)}
          {tourData.additionalImagesPosition === 'bottom' &&
            renderAdditionalImagesCarousel()}
          {tourData.videoPosition === 'bottom' &&
            renderVideoSection(
              tourData.videoUrl || undefined,
              tourData.videoThumbnailUrl || undefined,
              tourData.title
            )}
        </GridCol>
        <GridCol
          span={{ base: 12, sm: 12, md: 4, lg: 4, xl: 4 }}
          classNames={{
            col: classes.rightCol,
          }}
        >
          <div className={classes.mainImageWrapper}>
            <Image
              className={classes.mainImage}
              src={tourData.mainImageUrl || '/images/image-placeholder.png'}
              alt={tourData.title || ''}
              fill
            />
          </div>
          <Paper
            shadow="0"
            bg={'transparent'}
            mb={'sm'}
            pt={'sm'}
            pb={'sm'}
            pl={'md'}
            pr={'md'}
            classNames={{
              root: classes.whyBox,
            }}
          >
            <Stack gap={'sm'}>
              <Text
                classNames={{ root: classes.title }}
                c={'#FCBE11'}
                fz={24}
                fw={'bold'}
              >
                Why you should choose us?
              </Text>
              <Group wrap="nowrap">
                <RiCheckDoubleFill size={32} color="#FCBE11" />
                <Text classNames={{ root: classes.subTitle }} c={'#FCBE11'} fz={18}>
                  We have Vietnam tourism license
                </Text>
              </Group>
              <Group wrap="nowrap">
                <RiCheckDoubleFill size={32} color="#FCBE11" />
                <Text classNames={{ root: classes.subTitle }} c={'#FCBE11'} fz={18}>
                  We have good agencies
                </Text>
              </Group>
              <Group wrap="nowrap">
                <RiCheckDoubleFill size={32} color="#FCBE11" />
                <Text classNames={{ root: classes.subTitle }} c={'#FCBE11'} fz={18}>
                  We try make you happy
                </Text>
              </Group>
            </Stack>
          </Paper>
          <LandingCarousel
            slides={staticServiceSlides}
            height={400}
            orientation="vertical"
            loop={true}
          />
        </GridCol>
      </Grid>
    </div>
  );
}

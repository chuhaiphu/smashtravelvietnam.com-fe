import { MaintenanceGuard } from '@/components/guards/maintenance-guard';
import classes from './layout.module.scss';
import { LandingHeader } from '@/components/headers/landing-header/landing-header';
import { Container } from '@mantine/core';
import { getAppConfigAction } from '@/actions/app-config-action';
import { Metadata } from 'next';
import DynamicSection from '@/libs/section-ui/dynamic-section';
import { Suspense } from 'react';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const configResponse = await getAppConfigAction();
    const config = configResponse.data;

    return {
      title: config?.websiteTitle,
      description: config?.websiteDescription,
      icons: {
        icon: config?.faviconUrl || '/favicon.ico',
      },
      openGraph: {
        title: config?.websiteTitle || '',
        description: config?.websiteDescription || '',
        url: 'https://smashtravelvietnam.com',
        siteName: config?.websiteTitle || '',
        images: [
          {
            url: 'https://smashtravelvietnam.com/images/vietnam-sightseeing-sample.jpg',
            width: 1200,
            height: 630,
            alt: 'Vietnam Sightseeing Tours',
          },
        ],
        locale: 'en_US',
        type: 'website',
      },
      alternates: {
        canonical: 'https://smashtravelvietnam.com',
      }
    };
  } catch {
    // Fallback to default metadata if config not found
    return {
      title: 'Smash Travel Vietnam',
      description: 'Smash Travel Vietnam - Discover the beauty of Vietnam with our curated tours and travel experiences.',
      icons: {
        icon: '/favicon.ico',
      },
      openGraph: {
        title: 'Smash Travel Vietnam',
        description: 'Smash Travel Vietnam - Discover the beauty of Vietnam with our curated tours and travel experiences.',
        url: 'https://smashtravelvietnam.com',
        siteName: 'Smash Travel Vietnam',
        images: [
          {
            url: 'https://smashtravelvietnam.com/images/vietnam-sightseeing-sample.jpg',
            width: 1200,
            height: 630,
            alt: 'Vietnam Sightseeing Tours',
          },
        ],
        locale: 'en_US',
        type: 'website',
      },
      alternates: {
        canonical: 'https://smashtravelvietnam.com',
      },
    };
  }
}

export default async function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={classes.landingLayout}>
      <Suspense fallback={null}>
        <MaintenanceGuard />
      </Suspense>
      <Container size="xl" classNames={{ root: classes.landingContainer }}>
        <LandingHeader />
      </Container>
      {children}
      <DynamicSection position={15} />
    </div>
  );
}
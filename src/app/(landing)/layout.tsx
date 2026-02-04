import { MaintenanceGuard } from '@/components/guards/maintenance-guard';
import classes from './layout.module.scss';
import { LandingHeader } from '@/components/headers/landing-header/landing-header';
import { Container } from '@mantine/core';
import LandingFooter from '@/components/footers/landing-footer/landing-footer';
import { getAppConfigAction } from '@/actions/app-config-action';
import { Metadata } from 'next';

// Force dynamic rendering because MaintenanceGuard uses getServerSession() and redirect()
export const dynamic = 'force-dynamic';

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
    <MaintenanceGuard>
      <div className={classes.landingLayout}>
        <Container size="xl" classNames={{ root: classes.landingContainer }}>
          <LandingHeader />
        </Container>
        {children}
        <LandingFooter />
      </div >
    </MaintenanceGuard>
  );
}
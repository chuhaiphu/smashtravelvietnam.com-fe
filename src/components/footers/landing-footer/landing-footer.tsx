import { Container, Grid, GridCol, Group, Stack, Text } from '@mantine/core';
import classes from './landing-footer.module.scss';
import WhatsAppIcon from '@/components/icons/whatsapp-icon.svg';
import YoutubeIcon from '@/components/icons/youtube-icon.svg';
import InstagramIcon from '@/components/icons/instagram-icon.svg';
import FacebookIcon from '@/components/icons/facebook-icon.svg';
import VisaIcon from '@/components/icons/visa-icon.svg';
import MasterCardIcon from '@/components/icons/master-card-icon.svg';
import PayPalIcon from '@/components/icons/paypal-icon.svg';
import ApplePayIcon from '@/components/icons/apple-pay-icon.svg';

import { TbMailForward } from 'react-icons/tb';
import { PiMapPinSimpleAreaFill } from 'react-icons/pi';
import EarthIcon from '@/components/icons/vinaup-earth-icon';
import TiktokIcon from '@/components/icons/tiktok-icon.svg';
import Link from 'next/link';
import Image from 'next/image';
import { Route } from 'next';

export interface LandingFooterInfo {
  phoneWhatsapp?: string;
  email?: string;
  address: string;
  websiteUrl?: string;
  facebookUrl?: string;
  tiktokUrl?: string;
  youtubeUrl?: string;
  instagramUrl?: string;
}

export interface LandingFooterProps {
  title?: string;
  info?: LandingFooterInfo;
  logoUrl?: string;
  testimonials?: string[];
  bottomBar?: {
    brandName?: string;
    brandUrl?: string;
    copyrightYear?: string;
    poweredByLabel?: string;
    poweredByUrl?: string;
  };
}

export default function LandingFooter({
  title,
  info,
  logoUrl,
  testimonials,
  bottomBar,
}: LandingFooterProps) {
  return (
    <div className={classes.landingFooter}>
      <div className={classes.top}>
        <Container size="xl" classNames={{ root: classes.footerContainer }}>
          <Grid
            classNames={{
              root: classes.grid,
              col: classes.col,
            }}
            align="center"
          >
            <GridCol
              span={{ base: 12, md: 6.5 }}
              classNames={{
                col: classes.leftCol,
              }}
            >
              <Text fz={'h2'} c={'white'} className={classes.footerTitle}>
                {title}
              </Text>
              <Group className={classes.footerContent} gap={'md'}>
                <Group className={classes.textContainer} align="center">
                  <Link
                    href={`https://wa.me/${info?.phoneWhatsapp ?? ''}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.whatsappLink}
                  >
                    <WhatsAppIcon width={22} height={22} />
                    <Text c="white" fz={'h4'} classNames={{ root: classes.text }}>
                      {info?.phoneWhatsapp ? `+${info.phoneWhatsapp}` : ''} (Whatsapp)
                    </Text>
                  </Link>
                </Group>
                <Group className={classes.textContainer} align="center">
                  <TbMailForward size={24} color="white" />
                  <Text c="white" fz={'h4'} classNames={{ root: classes.text }}>
                    {info?.email ?? ''}
                  </Text>
                </Group>
              </Group>
              <Group className={classes.footerContent + ' ' + classes.address}>
                <Group
                  className={classes.textContainer}
                  align="center"
                  wrap="nowrap"
                >
                  <PiMapPinSimpleAreaFill
                    className={classes.locationIcon}
                    size={24}
                    color="white"
                  />
                  <Text c="white" fz={'h5'} classNames={{ root: classes.text }}>
                    {info?.address ?? ''}
                  </Text>
                </Group>
              </Group>
              <Group className={classes.footerLinks} gap={'xl'}>
                <Group className={classes.socials} gap={'md'}>
                  <Link
                    href={info?.facebookUrl as Route}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit our Facebook page"
                  >
                    <FacebookIcon width={28} height={28} />
                  </Link>
                  <Link
                    href={info?.instagramUrl as Route}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit our Instagram page"
                  >
                    <InstagramIcon width={28} height={28} />
                  </Link>
                  <Link
                    href={info?.youtubeUrl as Route}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit our YouTube channel"
                  >
                    <YoutubeIcon width={36} height={36} />
                  </Link>
                  <Link
                    href={info?.tiktokUrl as Route}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit our TikTok page"
                  >
                    <TiktokIcon width={81} height={28} />
                  </Link>
                </Group>
                <Group className={classes.site}>
                  <EarthIcon fill="white" size={24} />
                  <Text
                    component="a"
                    href={info?.websiteUrl as Route}
                    target="_blank"
                    c="white"
                    fz={'h4'}
                    td="underline"
                    classNames={{ root: classes.text }}
                  >
                    {info?.websiteUrl?.replace(/^https?:\/\//, '') ?? ''}
                  </Text>
                </Group>
              </Group>
            </GridCol>
            <GridCol span={{ base: 12, md: 5.5 }}>
              <Grid>
                <GridCol span={{ base: 12, md: 6 }}>
                  <Image
                    src={logoUrl || '/images/logo-icon.svg'}
                    alt="Logo"
                    width={180}
                    height={180}
                  />
                </GridCol>
                <GridCol span={{ base: 12, md: 6 }}>
                  <Stack gap={'xs'}>
                    <Text c={'white'} fz={'h3'}>
                      Review Us
                    </Text>
                    {testimonials?.map((item) => (
                      <Group key={item}>
                        <EarthIcon size={24} fill="white" />
                        <Text c={'white'} fz={'lg'}>
                          {item}
                        </Text>
                      </Group>
                    ))}
                  </Stack>
                </GridCol>
              </Grid>
            </GridCol>
          </Grid>
        </Container>
      </div>
      <div className={classes.bottom}>
        <Container size="xl" classNames={{ root: classes.footerContainer }}>
          <Group justify="space-between" align="center" w={'100%'}>
            <Text c={'white'} fz={'md'} classNames={{ root: classes.bottomText }}>
              <Link href={bottomBar?.brandUrl as Route}>{bottomBar?.brandName ?? ''}</Link>{' '}
              © {bottomBar?.copyrightYear ?? ''}{' '}
              <Link className={classes.whiteLink} href={bottomBar?.poweredByUrl as Route}>
                {bottomBar?.poweredByLabel ?? ''}
              </Link>
            </Text>
            <Group className={classes.paymentLinks}>
              <VisaIcon width={90} height={40} />
              <ApplePayIcon width={50} height={40} />
              <PayPalIcon width={50} height={40} />
              <MasterCardIcon width={50} height={40} />
            </Group>
          </Group>
        </Container>
      </div>
    </div>
  );
}

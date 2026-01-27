'use client';

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

import { TbMailForward } from "react-icons/tb";
import { PiMapPinSimpleAreaFill } from "react-icons/pi";
import EarthIcon from '@/components/icons/vinaup-earth-icon';
import TiktokIcon from '@/components/icons/tiktok-icon.svg';
import Link from 'next/link';
import { IAppConfigResponse } from '@/interfaces/app-config-interface';
import Image from 'next/image';

interface LandingFooterContainerProps {
  config: IAppConfigResponse | undefined;
}

export default function LandingFooterContainer({ config }: LandingFooterContainerProps) {
  return (
    <div className={classes.landingFooter}>
      <div className={classes.top}>
        <Container size="xl" classNames={{ root: classes.footerContainer }}>
          <Grid classNames={{
            root: classes.grid,
            col: classes.col
          }}
            align='center'>
            <GridCol span={{ base: 12, md: 6.5 }} classNames={{
              col: classes.leftCol
            }}
            >
              <Text fz={'h2'} c={'white'} className={classes.footerTitle}>Smash Travel Vietnam - V.I.L TOURS</Text>
              <Group className={classes.footerContent} gap={'md'}>
                <Group className={classes.textContainer} align='center'>
                  <Link href={`https://wa.me/${config?.phoneContact ? config?.phoneContact : '84912711789'}`}
                    target="_blank" rel="noopener noreferrer"
                    className={classes.whatsappLink}
                  >
                    <WhatsAppIcon width={22} height={22} />
                    <Text c='white' fz={'h4'} classNames={{ root: classes.text }}>{config?.phoneContact ? `+${config?.phoneContact}` : '+84 912 711 789'} (Whatsapp)</Text>
                  </Link>
                </Group>
                <Group className={classes.textContainer} align='center'>
                  <TbMailForward size={24} color='white' />
                  <Text c='white' fz={'h4'} classNames={{ root: classes.text }}>sales@smashtravelvietnam.com</Text>
                </Group>
              </Group>
              <Group className={classes.footerContent + ' ' + classes.address}>
                <Group className={classes.textContainer} align='center' wrap='nowrap'>
                  <PiMapPinSimpleAreaFill className={classes.locationIcon}
                    size={24} color='white' />
                  <Text c='white' fz={'h5'} classNames={{ root: classes.text }}>Chang Hai Hamlet, Loc Quang Commune, Dong Nai Province, Vietnam</Text>
                </Group>
              </Group>
              <Group className={classes.footerLinks} gap={'xl'}>
                <Group className={classes.socials} gap={'md'}>
                  <Link href="https://www.facebook.com/STVtours/" target="_blank" rel="noopener noreferrer" aria-label="Visit our Facebook page">
                    <FacebookIcon width={28} height={28} />
                  </Link>
                  <Link href="https://www.instagram.com/smashtravelvietnam/" target="_blank" rel="noopener noreferrer" aria-label="Visit our Instagram page">
                    <InstagramIcon width={28} height={28} />
                  </Link>
                  <Link href="https://www.youtube.com/@SmashTravelVietnam" target="_blank" rel="noopener noreferrer" aria-label="Visit our YouTube channel">
                    <YoutubeIcon width={36} height={36} />
                  </Link>
                  <Link href="https://www.tiktok.com/@smashtravelvietnam" target="_blank" rel="noopener noreferrer" aria-label="Visit our TikTok page">
                    <TiktokIcon width={81} height={28} />
                  </Link>
                </Group>
                <Group className={classes.site}>
                  <EarthIcon fill='white' size={24} />
                  <Text component='a'
                    href="https://smashtravelvietnam.com"
                    target='_blank' c='white'
                    fz={'h4'}
                    td="underline"
                    classNames={{ root: classes.text }}>
                    smashtravelvietnam.com
                  </Text>
                </Group>
              </Group>
            </GridCol>
            <GridCol span={{ base: 12, md: 5.5 }}>
              <Grid>
                <GridCol span={{ base: 12, md: 6 }}>
                  <Image src={config?.logoUrl || '/images/logo-icon.svg'} alt="Logo" width={180} height={180} />
                </GridCol>
                <GridCol span={{ base: 12, md: 6 }}>
                  <Stack gap={'xs'}>
                    <Text c={'white'} fz={'h3'}>Review Us</Text>
                    <Group>
                      <EarthIcon size={24} fill='white' />
                      <Text c={'white'} fz={'lg'}>TripAdvisor</Text>
                    </Group>
                    <Group>
                      <EarthIcon size={24} fill='white' />
                      <Text c={'white'} fz={'lg'}>Viator</Text>
                    </Group>
                    <Group>
                      <EarthIcon size={24} fill='white' />
                      <Text c={'white'} fz={'lg'}>TheVietnamTravel</Text>
                    </Group>
                  </Stack>
                </GridCol>
              </Grid>
            </GridCol>
          </Grid>
        </Container>
      </div>
      <div className={classes.bottom}>
        <Container size="xl" classNames={{ root: classes.footerContainer }}>
          <Group justify='space-between' align='center' w={'100%'}>
            <Text c={'white'} fz={'md'} classNames={{ root: classes.bottomText }}>
              <Link href="https://smashtravelvietnam.com">Smash Travel Vietnam</Link>
              {' '}© 2025{' '}
              <Link className={classes.whiteLink} href="https://vinaup.net">Vinaup</Link>
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
    </div >
  )
}


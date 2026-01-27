import { Group } from '@mantine/core';
import classes from './landing-header.module.scss';
import Link from 'next/link';
import LandingDrawer from '@/components/sidebars/landing-drawer/landing-drawer';

export async function LandingHeader() {
  return (
    <>
      <Group justify="space-between" align="center" className={classes.landingHeader}>
        <Link href="/" className={classes.logoLink}>
          <h1 className={classes.logoTitle}>
            Smash Travel Vietnam
          </h1>
        </Link>

        <Group>
          <Link href="/customized-tour" className={classes.navLink}>
            Customized Tour
          </Link>
          <LandingDrawer />
        </Group>
      </Group>
    </>
  );
}
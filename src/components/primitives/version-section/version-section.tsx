import { Group } from '@mantine/core';
import classes from './version-section.module.scss';
import LogoAlternative from '@/components/icons/vinaup-logo-alternative';
import Link from 'next/link';

const version = process.env.NEXT_PUBLIC_VERSION;

export function VersionSection() {
  return (
    <div className={classes.versionSectionRoot}>
      <Group gap={8}>
        <Link href="https://vinaup.net" target="_blank" rel="noopener noreferrer" className={classes.versionText}>
          {version}VinaUp
        </Link>
        <LogoAlternative />
      </Group>
    </div>
  );
}

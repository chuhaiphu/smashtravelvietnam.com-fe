import { Text } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { Route } from 'next';
import classes from './image-card.module.scss';

interface ImageCardProps {
  title: string;
  titleVariant?: 'floating' | 'banner' | 'none';
  imageUrl: string;
  href?: string;
  height?: number | string;
  aspectRatio?: string;
  borderRadius?: string;
  priority?: boolean;
}

export default function ImageCard({
  title,
  imageUrl,
  href,
  height,
  aspectRatio,
  priority = false,
  borderRadius = '0.5rem',
  titleVariant = 'floating',
}: ImageCardProps) {
  const content = (
    <div
      className={classes.imageWrapper}
      style={{
        height: height || (aspectRatio ? 'auto' : 320),
        aspectRatio,
        borderRadius,
      }}
    >
      <Image
        src={imageUrl}
        alt={title}
        className={classes.image}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {titleVariant === 'floating' ? (
        <Text className={classes.titleFloating}>{title}</Text>
      ) : titleVariant === 'banner' ? (
        <div className={classes.titleBannerWrapper}>
          <Text className={classes.titleBanner}>{title}</Text>
        </div>
      ) : null}
    </div>
  );

  if (href) {
    return (
      <Link href={href as Route} target='_blank' className={classes.linkWrapper}>
        {content}
      </Link>
    );
  }

  return content;
}

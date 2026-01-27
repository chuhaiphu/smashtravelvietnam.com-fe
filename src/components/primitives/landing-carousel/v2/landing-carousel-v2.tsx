'use client';

import { Carousel } from '@mantine/carousel';
import AutoScroll from './embla-auto-scroll/auto-scroll';
import classes from './landing-carousel-v2.module.scss';
import Image from 'next/image';

export function LandingCarouselV2() {
  return (
    <Carousel
      classNames={{
        root: classes.landingCarouselRoot
      }}
      height={160}
      slideSize={{ base: '100%', sm: '50%', md: '33.333333%', lg: '20%' }}
      slideGap="xl"
      emblaOptions={{ loop: true, align: 'start' }}
      withControls={false}
      plugins={[
        AutoScroll({
          direction: 'backward',
          playOnInit: true,
          speed: 1,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
        })
      ]}
    >
      <Carousel.Slide>
        <div className={classes.slideWrapper}>
          <Image fill src="/images/vietnam-airline.png" alt="" className={classes.image} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        </div>
      </Carousel.Slide>
      <Carousel.Slide>
        <div className={classes.slideWrapper}>
          <Image fill src="/images/slogan-vietjet.png" alt="" className={classes.image} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        </div>
      </Carousel.Slide>
      <Carousel.Slide>
        <div className={classes.slideWrapper}>
          <Image fill src="/images/malaysia-airline.png" alt="" className={classes.image} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        </div>
      </Carousel.Slide>
      <Carousel.Slide>
        <div className={classes.slideWrapper}>
          <Image fill src="/images/singapore-airline.png" alt="" className={classes.image} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        </div>
      </Carousel.Slide>
      <Carousel.Slide>
        <div className={classes.slideWrapper}>
          <Image fill src="/images/kitchen-garden.png" alt="" className={classes.image} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        </div>
      </Carousel.Slide>
      <Carousel.Slide>
        <div className={classes.slideWrapper}>
          <Image fill src="/images/kitchen-kmg.png" alt="" className={classes.image} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        </div>
      </Carousel.Slide>
      {/* <Carousel.Slide>
        <div className={classes.slideWrapper}>
          <Image src="/kitchen-ocean-mountain.png" alt="" fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Carousel.Slide> */}
      <Carousel.Slide>
        <div className={classes.slideWrapper}>
          <Image fill src="/images/kitchen-ocean-kitchen.png" alt="" className={classes.image} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        </div>
      </Carousel.Slide>
    </Carousel>
  );
}
'use client'

import { Carousel } from '@mantine/carousel';
import { useRef, useState } from 'react';
import classes from './landing-carousel-v1.module.scss';
import { Container, Group } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import StaticItemV2, { StaticItemV2Props } from '@/components/grids/grid-items-container/static-item/v2/static-item-v2';
export interface CarouselSlide {
  titleMain?: string;
  titleHighlight?: string;
  subTitle?: string;
  item: string;
  alt?: string;
  type?: 'IMAGE' | 'STATIC_ITEM';
  staticItem?: StaticItemV2Props['item'];
}

interface LandingCarouselV1Props {
  slides: CarouselSlide[];
  showText?: boolean;
  height?: number;
  loop?: boolean;
  orientation?: 'horizontal' | 'vertical';
}

export function LandingCarouselV1({
  slides = [],
  showText = true,
  height = 540,
  loop = true,
  orientation = 'horizontal',
}: LandingCarouselV1Props) {
  const [active, setActive] = useState(0);
  const autoplay = useRef(Autoplay({ delay: 3000 }));

  // Validate and normalize slides array
  const validSlides = Array.isArray(slides)
    ? slides.filter((slide) => {
      if (!slide || typeof slide !== 'object') return false;
      return true;
    })
    : slides;
  // Early return if no valid slides
  if (validSlides.length === 0) {
    return null;
  }

  const currentSlide = validSlides[active];
  const showTextBox = showText && (currentSlide?.titleMain || currentSlide?.subTitle);
  return (
    <div className={classes.landingCarouselWrapper}>
      <Carousel
        height={height}
        withIndicators={true}
        slideSize="100%"
        slideGap="md"
        emblaOptions={{ loop, align: 'center' }}
        onSlideChange={setActive}
        classNames={{
          root: classes.landingCarousel,
          indicators: classes.indicators,
          indicator: classes.indicator,
          slide: classes.slide,
        }}
        withControls={false}
        orientation={orientation}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={() => autoplay.current.play()}
      >
        {validSlides.map((slide, index) => (
          <Carousel.Slide pb={0} key={index}>
            {slide.type === 'STATIC_ITEM' ? (
              <StaticItemV2 item={slide.staticItem || { name: '', imageUrl: '', endpoint: '' }} height={height} />
            ) : (
              <Image
                src={slide.item || ''}
                alt={slide.alt || `Slide ${index + 1}`}
                fill
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                className={classes.image}
              />
            )}
          </Carousel.Slide>
        ))}
      </Carousel>

      {showTextBox && (
        <div className={classes.textBoxWrapper}>
          <Container className={classes.textBoxContainer} size={'xl'}>
            <Group justify="space-between" align="center" classNames={{ root: classes.textBoxGroup }}>
              <div>
                {currentSlide?.titleMain && (
                  <Group gap={8}>
                    <span className={classes.title}>{currentSlide.titleMain}</span>
                    {currentSlide.titleHighlight && (
                      <span className={classes.highlight}>{currentSlide.titleHighlight}</span>
                    )}
                  </Group>
                )}
                {currentSlide?.subTitle && (
                  <p className={classes.subTitleText}>{currentSlide.subTitle}</p>
                )}
              </div>
            </Group>
          </Container>
        </div>
      )}
    </div>
  );
}
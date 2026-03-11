import { LandingCarousel } from '@/components/primitives/landing-carousel/landing-carousel';
import { SECTION_KEYS } from './section-key';
import { SECTION_METADATA } from './section-metadata';
import LandingFooter from '@/components/footers/landing-footer/landing-footer';

// Full registry with components for runtime - key is componentKey (immutable)
const REGISTRY_MAP = {
  [SECTION_KEYS.LANDING_CAROUSEL_V1]: {
    component: LandingCarousel,
    properties: SECTION_METADATA[SECTION_KEYS.LANDING_CAROUSEL_V1].properties,
  },
  [SECTION_KEYS.LANDING_FOOTER_V1]: {
    component: LandingFooter,
    properties: SECTION_METADATA[SECTION_KEYS.LANDING_FOOTER_V1].properties,
  },
};

export const SECTION_REGISTRY: Record<string, React.ElementType> =
  Object.fromEntries(
    Object.entries(REGISTRY_MAP).map(([key, value]) => [key, value.component])
  );

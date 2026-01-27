import { LandingCarouselV1 } from "@/components/primitives/landing-carousel/v1/landing-carousel-v1";
import { SECTION_KEYS } from "./section-key";
import { SECTION_METADATA } from "./section-metadata";

// Full registry with components for runtime - key is componentKey (immutable)
const REGISTRY_MAP = {
  [SECTION_KEYS.LANDING_CAROUSEL_V1]: {
    component: LandingCarouselV1,
    type: SECTION_METADATA[SECTION_KEYS.LANDING_CAROUSEL_V1].type,
    properties: SECTION_METADATA[SECTION_KEYS.LANDING_CAROUSEL_V1].properties,
  },
}

export const SECTION_REGISTRY: Record<string, React.ElementType> = Object.fromEntries(
  Object.entries(REGISTRY_MAP).map(([key, value]) => [key, value.component])
);
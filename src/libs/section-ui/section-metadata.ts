import { SECTION_KEYS } from "./section-key";

export const SECTION_METADATA = {
  [SECTION_KEYS.LANDING_CAROUSEL_V1]: {
    name: "Banner",
    type: "banner",
    properties: {
      slides: {
        titleMain: null,
        titleHighlight: null,
        subTitle: null,
        item: null,
        alt: null,
        type: null,
        staticItem: {
          name: null,
          imageUrl: null,
          endpoint: null,
        },
      },
      showText: null,
      height: null,
      loop: null,
      orientation: null,
    },
  },
};

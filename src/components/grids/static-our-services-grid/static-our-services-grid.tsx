import { Grid, GridCol } from '@mantine/core';
import ImageCard from '@/components/primitives/image-card/image-card';
import { SERVICE_ITEMS } from '@/constants';

export default async function StaticOurServicesGrid() {
  'use cache'
  return (
    <Grid mb="3.5rem" gutter="lg">
      {SERVICE_ITEMS.map((item, index) => (
        <GridCol span={{ base: 12, sm: 6, md: 3 }} key={item.name}>
          <ImageCard
            title={item.name}
            imageUrl={item.imageUrl}
            href={item.endpoint}
            titleVariant="banner"
            // Only the first item should be priority to avoid flickering
            priority={index === 0}
          />
        </GridCol>
      ))}
    </Grid>
  );
}

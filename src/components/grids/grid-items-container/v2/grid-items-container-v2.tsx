import { Grid, GridCol, Group, Stack, Text } from "@mantine/core";
import classes from './grid-items-container-v2.module.scss'
import StaticItemV1 from "../static-item/v1/static-item-v1";
import ExploreDestinationsButton from "./explore-destinations-button";

export default function GridItemsContainerV2() {
  return (
    <Grid classNames={{
      root: classes.gridItemContainer
    }}>
      <GridCol span={{ base: 12, sm: 6, md: 6, lg: 6 }} h={612}>
        <Stack justify="space-between" align="stretch" h={612}>
          <Grid>
            <GridCol span={6} h={500}>
              <StaticItemV1 imageUrl={'/images/ha-noi-sample.jpg'} title="Ha Noi" />
            </GridCol>
            <GridCol span={6} h={500}>
              <StaticItemV1 imageUrl={'/images/khanh-hoa-sample.jpg'} title="Khanh Hoa" />
            </GridCol>
          </Grid>
          <Group
            wrap="nowrap"
            justify="space-evenly" h={120} mb={'xs'}
            p={4}
            classNames={{
              root: classes.exploreGroup
            }}>
            <Text c={'#FCBE11'} fz={'4rem'}>33+</Text>
            <Text c={'#F9F9F9'} fz={'1.2rem'}>
              Destinations in Viet Nam
            </Text>
            <ExploreDestinationsButton className={classes.exploreButton} />
          </Group>
        </Stack>
      </GridCol>
      <GridCol span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
        <Stack h={612}>
          <StaticItemV1 imageUrl={'/images/da-lat-sample.jpg'} title="Da Lat" />
          <StaticItemV1 imageUrl={'/images/phu-quoc-sample.jpg'} title="Phu Quoc" />
        </Stack>
      </GridCol>
    </Grid>
  )
}
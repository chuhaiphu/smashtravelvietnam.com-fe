import { Grid, GridCol } from "@mantine/core";
import StaticItemV2 from "../static-item/v2/static-item-v2";
import { SERVICE_ITEMS } from "@/constants";

export default function GridItemsContainerV1() {

  return (
    <Grid mb="3.5rem" gutter="lg">
      {SERVICE_ITEMS.map((item) => (
        <GridCol span={{ base: 12, sm: 6, md: 3 }} key={item.name}>
          <StaticItemV2 item={item} />
        </GridCol>
      ))}
    </Grid>
  );
}
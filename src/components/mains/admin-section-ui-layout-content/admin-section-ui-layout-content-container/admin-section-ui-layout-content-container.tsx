'use client';

import { Grid, GridCol, Group, Text } from "@mantine/core";
import SectionUINav from "@/components/sidebars/section-ui-nav/section-ui-nav";
import classes from "./admin-section-ui-layout-content-container.module.scss";

interface AdminSectionUILayoutContentContainerProps {
  types: string[];
  children: React.ReactNode;
}

export default function AdminSectionUILayoutContentContainer({
  types,
  children
}: AdminSectionUILayoutContentContainerProps) {
  return (
    <div>
      <Group className={classes.pageHeader} justify="space-between">
        <Text size="xl">Section UI</Text>
      </Group>
      <Grid>
        <GridCol span={{ base: 12, sm: 12, md: 4, lg: 4, xl: 3 }}>
          <SectionUINav types={types} />
        </GridCol>
        <GridCol span={{ base: 12, sm: 12, md: 8, lg: 8, xl: 9 }}>{children}</GridCol>
      </Grid>
    </div>
  );
}

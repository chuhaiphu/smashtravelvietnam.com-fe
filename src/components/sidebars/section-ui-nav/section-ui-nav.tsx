'use client';

import React from "react";
import { Paper, Stack, Group, Text } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import { Route } from "next";
import classes from "./section-ui-nav.module.scss";

interface SectionUINavProps {
  types: string[];
}

export default function SectionUINav({ types }: SectionUINavProps) {
  const router = useRouter();
  const { type: currentType } = useParams();

  const isActiveItem = (type: string) => {
    return currentType === type;
  };

  return (
    <Paper p={'sm'} radius={'md'} shadow="xs" withBorder>
      <Stack gap={'xs'}>
        {types.map((type) => (
          <Stack
            key={type}
            className={`${classes.navItem} ${isActiveItem(type) ? classes.active : ''}`}
            bd={'1px solid #c7c7c7'}
            bdrs={'sm'}
            p={'8px'}
            onClick={() => { router.push(`/admin/section-ui/${type}` as Route); }}
          >
            <Group>
              <Text fw={isActiveItem(type) ? 'bold' : 'normal'} tt="capitalize">{type}</Text>
            </Group>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
}

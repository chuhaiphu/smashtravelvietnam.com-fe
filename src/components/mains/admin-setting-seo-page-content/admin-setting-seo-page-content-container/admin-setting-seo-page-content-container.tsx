'use client';

import { IAppConfigResponse } from "@/interfaces/app-config-interface";
import { Group, Paper, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import classes from "./admin-setting-seo-page-content-container.module.scss";
import { useState } from "react";
import { updateAppConfigAction } from "@/actions/app-config-action";
import { useDebouncedCallback } from "use-debounce";
import Link from "next/link";
import { HiOutlineEye } from "react-icons/hi";

interface AdminSettingSeoPageContentContainerProps {
  appConfig: IAppConfigResponse | undefined;
}

export default function AdminSettingSeoPageContentContainer({ appConfig }: AdminSettingSeoPageContentContainerProps) {
  const [title, setTitle] = useState(appConfig?.websiteTitle || '');
  const [description, setDescription] = useState(appConfig?.websiteDescription || '');

  const handleUpdateTitle = useDebouncedCallback(async (newTitle: string) => {
    await updateAppConfigAction({ websiteTitle: newTitle });
    notifications.show({
      message: 'Saved successfully',
      color: 'green',
      position: 'top-right',
      autoClose: 900,
    });
  }, 1500);

  const handleUpdateDescription = useDebouncedCallback(async (newDescription: string) => {
    await updateAppConfigAction({ websiteDescription: newDescription });
    notifications.show({
      message: 'Saved successfully',
      color: 'green',
      position: 'top-right',
      autoClose: 900,
    });
  }, 1500);

  return (
    <Stack gap={'md'}>
      <Paper radius={'md'} shadow="xs" classNames={{ root: classes.paperBlock }}>
        <Stack p={'sm'} gap={'md'}>
          <Stack gap={2}>
            <Group justify="space-between" wrap="nowrap">
              <Text size="lg">Site title</Text>
            </Group>
            <TextInput
              size="md"
              value={title}
              placeholder="A title under 100 characters"
              maxLength={100}
              onChange={(e) => {
                setTitle(e.target.value);
                handleUpdateTitle(e.target.value);
              }}
            />
          </Stack>
          <Stack gap={2}>
            <Group justify="space-between" wrap="nowrap">
              <Text size="lg">Description</Text>
            </Group>
            <Textarea
              size="md"
              value={description}
              placeholder="A description under 300 characters"
              maxLength={300}
              onChange={(e) => {
                setDescription(e.target.value);
                handleUpdateDescription(e.target.value);
              }}
            />
          </Stack>
        </Stack>
      </Paper>
      <Paper radius={'md'} shadow="xs" classNames={{ root: classes.paperBlock }}>
        <Group justify="space-between" wrap="nowrap" p={'sm'} gap={'md'}>
          <Stack gap={2}>
            <Text size="lg">Sitemap.xml</Text>
            <Text c="dimmed">Activated</Text>
          </Stack>
          <Link
            href="/sitemap.xml"
            target="_blank"
          >
            <HiOutlineEye color="black" size={28} />
          </Link>
        </Group>
      </Paper>
      <Paper radius={'md'} shadow="xs" classNames={{ root: classes.paperBlock }}>
        <Group justify="space-between" wrap="nowrap" p={'sm'} gap={'md'}>
          <Stack gap={2}>
            <Text size="lg">Robots.txt</Text>
            <Text c="dimmed">Activated</Text>
          </Stack>
          <Link
            href="/robots.txt"
            target="_blank"
          >
            <HiOutlineEye color="black" size={28} />
          </Link>
        </Group>
      </Paper>
    </Stack>
  );
}

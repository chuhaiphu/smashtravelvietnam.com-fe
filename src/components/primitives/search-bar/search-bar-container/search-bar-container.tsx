"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ActionIcon, Grid, GridCol, Group, Popover, TextInput, UnstyledButton } from "@mantine/core";
import classes from "./search-bar-container.module.scss";
import LocationIcon from "@/components/icons/vinaup-location-icon";
import { useEffect, useRef, useState } from "react";
import { OPEN_DESTINATIONS_POPOVER_EVENT, VN_PROVINCES } from "@/constants";
import { notifications } from "@mantine/notifications";
import { HiOutlineX, HiOutlineSearch } from "react-icons/hi";
import { Route } from "next";
import Image from "next/image";

interface SearchBarProps {
  searchType?: 'tour' | 'blog';
  logoUrl?: string;
}

export function SearchBarContainer({ searchType = 'tour', logoUrl = '/images/logo-icon.svg' }: SearchBarProps) {
  const router = useRouter();
  const params = useSearchParams();
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const scrollAnchorRef = useRef<HTMLDivElement | null>(null);

  // Local state for search query and destinations
  const [searchQuery, setSearchQuery] = useState(params.get("q") || "");
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(
    params.get("destinations")?.split(",").filter(Boolean) || []
  );

  const basePath = searchType === 'blog' ? '/blogs' : '/tours';

  useEffect(() => {
    const handler = () => {
      scrollAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      setDropdownOpened(true);
      // Focus after open (best-effort)
      requestAnimationFrame(() => {
        const el = document.getElementById("stv-search-bar") as HTMLInputElement | null;
        el?.focus();
      });
    };

    window.addEventListener(OPEN_DESTINATIONS_POPOVER_EVENT, handler as EventListener);
    return () => window.removeEventListener(OPEN_DESTINATIONS_POPOVER_EVENT, handler as EventListener);
  }, []);

  const handleDestinationSelect = (destination: string) => {
    const currentDestinations = new Set(selectedDestinations);
    if (currentDestinations.has(destination)) {
      currentDestinations.delete(destination);
    } else {
      if (selectedDestinations.length === 3) {
        notifications.show({
          message: 'You can only select up to 3 destinations',
          color: 'yellow',
          position: 'top-right',
        });
        return;
      }
      currentDestinations.add(destination);
    }
    const newDestinations = Array.from(currentDestinations);
    setSelectedDestinations(newDestinations);

    // Auto navigate to appropriate page with updated destinations
    const newParams = new URLSearchParams();
    if (searchQuery) newParams.set("q", searchQuery);
    if (newDestinations.length > 0) {
      newParams.set("destinations", newDestinations.join(","));
    }
    const queryString = newParams.toString();
    const url = `${basePath}${queryString ? `?${queryString}` : ""}`;
    router.push(url as Route);
  };

  const handleClearDestinations = () => {
    setSelectedDestinations([]);
  };

  const handleSearch = () => {
    const newParams = new URLSearchParams();
    if (searchQuery) newParams.set("q", searchQuery);
    if (selectedDestinations.length > 0) {
      newParams.set("destinations", selectedDestinations.join(","));
    }
    const queryString = newParams.toString();
    const url = `${basePath}${queryString ? `?${queryString}` : ""}`;
    router.push(url as Route);
  };

  return (
    <Popover
      opened={dropdownOpened}
      position="bottom"
      width="target"
      withinPortal={false}
    >
      <Popover.Target>
        <div ref={scrollAnchorRef} role="button">
          <TextInput
            id="stv-search-bar"
            placeholder={"Search here..."}
            classNames={{
              root: classes.searchBarRoot,
              input: classes.searchBarInput,
              section: classes.searchBarSection,
            }}
            size={'lg'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            leftSection={
              <Image src={logoUrl} alt="Logo" width={64} height={64} fetchPriority="high" />
            }
            rightSection={
              <Group gap={5}>
                {selectedDestinations.length > 0 && (
                  <span className={classes.selectedDestinations}>
                    {selectedDestinations.join(", ")}
                  </span>
                )}
                <div className={classes.rightSectionButtons}>
                  <ActionIcon
                    variant="filled"
                    color="dark"
                    size="xl"
                    radius="xl"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDropdownOpened((o) => !o);
                    }}
                    aria-label="Select destinations"
                  >
                    <LocationIcon size={26} />
                  </ActionIcon>
                  <ActionIcon
                    variant="filled"
                    color="dark"
                    size="xl"
                    radius="xl"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSearch();
                    }}
                    aria-label="Search"
                  >
                    <HiOutlineSearch size={24} color="#00E1FF" />
                  </ActionIcon>
                </div>
              </Group>
            }
          />
        </div>
      </Popover.Target>
      <Popover.Dropdown classNames={{ dropdown: classes.dropdownContainer }}>
        <div className={classes.headerSection}>
          <h3 className={classes.headerTitle}>Destinations</h3>
          {selectedDestinations.length > 0 && (
            <div className={classes.selectedDestinationsWrapper}>
              <div className={classes.selectedDestinations}>
                {selectedDestinations.map((dest, index) => (
                  <span key={dest} className={classes.selectedDestination}>
                    {dest}
                    {index < selectedDestinations.length - 1 && ", "}
                  </span>
                ))}
              </div>
              <ActionIcon
                variant="subtle"
                color="gray"
                size="md"
                onClick={handleClearDestinations}
                className={classes.clearButton}
                title="Clear all destinations"
              >
                <HiOutlineX size={20} color='#013437' />
              </ActionIcon>
            </div>
          )}
        </div>
        <Grid align="center" justify="center" gutter={'md'}>
          {VN_PROVINCES.map((province) => {
            const isSelected = selectedDestinations.includes(province);
            return (
              <GridCol
                key={province}
                span={{ base: 6, sm: 3, md: 2 }}
                className={classes.destinationCol}
              >
                <UnstyledButton
                  onClick={() => handleDestinationSelect(province)}
                  classNames={{
                    root: `${classes.destinationButton} ${isSelected ? classes.selected : ""}`
                  }}
                >
                  {province}
                </UnstyledButton>
              </GridCol>
            );
          })}
        </Grid>
      </Popover.Dropdown>
    </Popover>
  );
}

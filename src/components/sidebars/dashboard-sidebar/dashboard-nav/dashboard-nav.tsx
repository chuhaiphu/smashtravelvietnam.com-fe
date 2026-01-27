'use client';
import { NavLink } from '@mantine/core';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { NavItemProps } from './_props';
import { FaChevronUp } from 'react-icons/fa6';
import Link from 'next/link';

import classes from './dashboard-nav.module.scss';
import { isPathActive } from '@/helpers/function-helpers';
import { useLayoutSiderStore } from '@/libs/zustand/layout-sider-store';

export function DashboardNav({ navItems }: Readonly<{ navItems: NavItemProps[] }>) {
  const pathName = usePathname();
  const { close } = useLayoutSiderStore();

  const [isParentItemOpened, setIsParentItemOpened] = useState<Record<string, boolean>>({});

  const navItemsRef = useRef(navItems);

  useEffect(() => {
    navItemsRef.current = navItems;
  }, [navItems]);

  useEffect(() => {
    setIsParentItemOpened((prev) => {
      const next = { ...prev };
      navItemsRef.current.forEach((item) => {
        if (item.childrens?.some(c => c.path === pathName) || item.defaultOpened) {
          next[item.key] = true;
        }
      })
      return next;
    });
  }, [pathName]);

  const renderNavItem = (item: NavItemProps, isChild: boolean = false) => {
    if (item.key === 'spacer') {
      return <div key="spacer" className={classes.navSpacer} />;
    }

    // Handle parent items
    if (item.childrens) {
      const hasChildrenActived = item.childrens.some((child) => isPathActive(pathName, child.path!));
      return (
        <NavLink
          key={item.key}
          label={item.label}
          rightSection={<div className={classes.rightSectionIconWrapper}>
            <FaChevronUp size={16} className={classes.rightSectionIcon} />
          </div>}
          classNames={{
            root: `
            ${classes.parentNavItem} 
            ${isParentItemOpened[item.key] ? classes.opened : ''} 
            ${hasChildrenActived ? classes.actived : ''}
            `,
            children: classes.childrenNavGroup,
            label: classes.parentNavLabel,
            body: classes.parentNavBody,
            section: classes.parentNavSection,
          }}
          opened={isParentItemOpened[item.key]}
          onChange={(opened) => {
            setIsParentItemOpened((prev) => ({ ...prev, [item.key]: opened }));
          }}
        >
          {item.childrens.map((child) => renderNavItem(child, true))}
        </NavLink>
      );
    }

    // Handle sub items with path
    if (item.path) {
      const isActived = isPathActive(pathName, item.path, item.isRoot);
      const displayIcon = isActived && item.rightSectionActive
        ? item.rightSectionActive
        : item.rightSection;

      if (isChild) {
        return (
          <NavLink
            key={item.key}
            label={item.label}
            component={Link}
            href={item.path}
            onClick={close}
            rightSection={
              <div className={classes.rightSectionIconWrapper}>
                {displayIcon}
              </div>
            }
            classNames={{
              label: classes.childrenNavLabel,
              body: classes.childrenNavBody,
              root: `${classes.childrenNavItem} ${isActived ? classes.actived : ''}`,
              section: classes.childrenNavSection,
            }}
            active={isActived}
          />
        );
      }
      return (
        <NavLink
          key={item.key}
          label={item.label}
          component={Link}
          href={item.path}
          onClick={close}
          classNames={{
            root: `
            ${classes.parentNavItem}
            ${classes.parentNavItemNoChildren} 
            ${isActived ? classes.actived : ''}
            `,
            label: classes.parentNavLabel,
            body: classes.parentNavBody,
            section: classes.parentNavSection,
          }}
          rightSection={<div className={classes.rightSectionIconWrapper}>{displayIcon}</div>}
          onChange={(opened) => {
            setIsParentItemOpened((prev) => ({ ...prev, [item.key]: opened }));
          }}
        />
      );
    }

    // Handle items without path (just display)
    return <NavLink key={item.key} label={item.label} rightSection={item.rightSection} />;
  };

  return <div className={classes.navRoot}>{navItems.map((item) => renderNavItem(item))}</div>;
}

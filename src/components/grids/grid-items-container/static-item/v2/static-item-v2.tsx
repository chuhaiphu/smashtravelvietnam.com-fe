import { Text } from "@mantine/core";
import classes from "./static-item-v2.module.scss";
import Image from "next/image";
import Link from "next/link";
import { Route } from "next";

export interface StaticItemV2Props {
  item: {
    name: string;
    imageUrl: string;
    endpoint: string;
  };
  height?: number;
}

export default function StaticItemV2({ item, height }: StaticItemV2Props) {
  return (
    <Link
      href={item.endpoint as Route}
      className={classes.linkWrapper}
    >
      <div
        className={classes.imageWrapper}
        style={{ height: height || 320 }}
      >
        <Image
          src={item.imageUrl}
          alt={item.name}
          className={classes.image}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        <div className={classes.itemTitleWrapper}>
          <Text classNames={{ root: classes.itemTitle }}>
            {item.name}
          </Text>
        </div>
      </div>
    </Link>
  );
}
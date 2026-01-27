import { Text } from "@mantine/core";
import classes from './static-item-v1.module.scss'
import Image from "next/image";
interface StaticItemV1Props {
  imageUrl: string;
  title: string;
}

export default function StaticItemV1({ imageUrl, title }: StaticItemV1Props) {
  return (
    <div className={classes.imageWrapper}>
      <Image
        src={imageUrl}
        alt={title}
        className={classes.image}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <Text classNames={{ root: classes.slideTitle }}>{title}</Text>
    </div>
  )
}
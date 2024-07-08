import styles from "./TaskItem.module.scss";
import { PropsWithChildren } from "react";
import Link, { LinkProps } from "next/link";
import { IconArrow } from "../Icons";

export default function TaskItem({
  children,
  ...props
}: PropsWithChildren<LinkProps>) {
  return (
    <Link className={styles["task-item"]} {...props}>
      <div className={styles.content}>{children}</div>
      <IconArrow />
    </Link>
  );
}

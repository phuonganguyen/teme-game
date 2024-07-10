import styles from "./TaskItem.module.scss";
import { PropsWithChildren } from "react";
import Link, { LinkProps } from "next/link";
import { IconArrow } from "../Icons";

export default function TaskItem({ children }: PropsWithChildren<{}>) {
  return (
    <div className={styles["task-item"]}>
      <div className={styles.content}>{children}</div>
      <IconArrow />
    </div>
  );
}

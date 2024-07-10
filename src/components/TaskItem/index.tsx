import styles from "./TaskItem.module.scss";
import { PropsWithChildren } from "react";
import { IconArrow } from "../Icons";

type Props = {
  onClick?: () => void;
};

export default function TaskItem({
  children,
  onClick,
}: PropsWithChildren<Props>) {
  return (
    <div className={styles["task-item"]} onClick={onClick}>
      <div className={styles.content}>{children}</div>
      <IconArrow />
    </div>
  );
}

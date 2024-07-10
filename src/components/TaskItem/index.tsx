import styles from "./TaskItem.module.scss";
import { PropsWithChildren } from "react";
import { IconArrow, IconVerified } from "../Icons";

type Props = {
  onClick?: () => void;
  completed?: boolean;
};

export default function TaskItem({
  children,
  onClick,
  completed = false,
}: PropsWithChildren<Props>) {
  return (
    <div className={styles["task-item"]} onClick={onClick}>
      <div className={styles.content}>{children}</div>
      {completed ? <IconVerified /> : <IconArrow />}
    </div>
  );
}

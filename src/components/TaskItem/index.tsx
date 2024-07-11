import styles from "./TaskItem.module.scss";
import { PropsWithChildren } from "react";
import { IconArrow, IconVerified } from "../Icons";

type Props = {
  onClick?: () => void;
  completed?: boolean;
  disabled?: boolean;
};

export default function TaskItem({
  children,
  onClick,
  completed = false,
  disabled = false,
}: PropsWithChildren<Props>) {
  const handleClick = () => {
    !completed && onClick?.();
  };

  return (
    <div
      className={`${styles["task-item"]} ${disabled ? styles.disabled : ""}`}
      onClick={handleClick}
    >
      <div className={styles.content}>{children}</div>
      {completed ? <IconVerified /> : <IconArrow />}
    </div>
  );
}

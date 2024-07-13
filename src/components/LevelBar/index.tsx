import { IconArrowUp } from "../Icons";
import { IconLevel1 } from "../Icons/Levels";

import styles from "./LevelBar.module.scss";

type Props = {
  level: number;
  currenCoin: number;
};

export default function LevelBar({ level, currenCoin }: Props) {
  const max = 10000;
  return (
    <div className={styles.level}>
      <IconLevel1 />
      <div className={styles.process}>
        <div className={styles.text}>0 / 10K</div>
        <progress
          className={styles["progress-bar"]}
          value={currenCoin}
          max={max}
        >
          {currenCoin}%
        </progress>
      </div>
      <button className={styles["btn-up"]}>
        <IconArrowUp />
        Up
      </button>
    </div>
  );
}

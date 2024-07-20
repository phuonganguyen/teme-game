import Link from "next/link";

import { catLevelUpMapper } from "@/constants";
import { formatNumberCompact } from "@/utils";

import { IconArrowUp } from "../Icons";
import IconLevel from "../Icons/Level";
import styles from "./LevelBar.module.scss";

type Props = {
  level: number;
  currenCoin: number;
};

export default function LevelBar({ level, currenCoin }: Props) {
  const max = catLevelUpMapper[level];
  return (
    <Link className={styles.level} href="/upgrade">
      <IconLevel level={level} width={32} height={32} />
      <div className={styles.process}>
        <div className={styles.text}>
          {formatNumberCompact(currenCoin)} / {formatNumberCompact(max)}
        </div>
        <progress
          className={styles["progress-bar"]}
          value={currenCoin}
          max={max}
        >
          {currenCoin}%
        </progress>
      </div>
      <div className={styles["btn-up"]}>
        <IconArrowUp />
        Up
      </div>
    </Link>
  );
}

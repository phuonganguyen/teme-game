import Link from 'next/link';

import { IconArrowUp } from '../Icons';
import IconLevel from '../Icons/Level';
import styles from './LevelBar.module.scss';

type Props = {
  level: number;
  currenCoin: number;
};

export default function LevelBar({ level, currenCoin }: Props) {
  const max = 10000;
  return (
    <div className={styles.level}>
      <IconLevel level={level} width={32} height={32} />
      <div className={styles.process}>
        <div className={styles.text}>
          {currenCoin} / {max}
        </div>
        <progress
          className={styles["progress-bar"]}
          value={currenCoin}
          max={max}
        >
          {currenCoin}%
        </progress>
      </div>
      <Link className={styles["btn-up"]} href={"/upgrade"}>
        <IconArrowUp />
        Up
      </Link>
    </div>
  );
}

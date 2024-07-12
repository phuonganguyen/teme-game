import Image from "@/components/Image";
import styles from "./TaskDetail.module.scss";
import { formatNumber } from "@/utils";
import { IconCoin } from "../Icons";
type Props = {
  name: string;
  coinReward: number;
};

export default function TaskDetail({ name, coinReward }: Props) {
  return (
    <div className={styles["task-detail"]}>
      {name}
      <div className={styles.reward}>
        <IconCoin width={20} height={20} />
        {`+ ${formatNumber(coinReward)}`}
      </div>
    </div>
  );
}

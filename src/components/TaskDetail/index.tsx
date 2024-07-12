import Image from "@/components/Image";
import styles from "./TaskDetail.module.scss";
import { formatNumber } from "@/utils";
type Props = {
  name: string;
  coinReward: number;
};

export default function TaskDetail({ name, coinReward }: Props) {
  return (
    <div className={styles["task-detail"]}>
      {name}
      <div className={styles.reward}>
        <Image src={"/images/coins.png"} width={20} height={20} alt="" />
        {`+ ${formatNumber(coinReward)}`}
      </div>
    </div>
  );
}

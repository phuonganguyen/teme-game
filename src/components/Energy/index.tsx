import Image from "../Image";
import CountDown from "./CountDown";
import styles from "./Energy.module.scss";

type Props = {
  level: number;
  energy: number;
  resetTime: Date;
};

const energyByLevel: { [level: number]: number } = {
  1: 1000,
  2: 1500,
  3: 2000,
  4: 2500,
  5: 3000,
  6: 5000,
  7: 5500,
  8: 6000,
  9: 6500,
  10: 7000,
  11: 8000,
  12: 9000,
  13: 10000,
  14: 12000,
  15: 15000,
};

export default function Energy({ level, energy, resetTime }: Props) {
  const maxEnergy = energyByLevel[level];

  return (
    <div className={styles.container}>
      <div className={styles.energy}>
        <Image
          src={"/images/icons/energy.png"}
          height={16}
          width={16}
          alt="energy"
        />
        {energy}/{maxEnergy}
      </div>
      <CountDown />
    </div>
  );
}

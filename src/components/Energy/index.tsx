import Image from "../Image";
import styles from "./Energy.module.scss";

type Props = {
  level: number;
};

export default function Energy({ level }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.energy}>
        <Image
          src={"/images/icons/energy.png"}
          height={16}
          width={16}
          alt="energy"
        />
        900/1000
      </div>
      ~ 1h 58m 1s
    </div>
  );
}

import Image from "next/image";
import styles from "./ComingSoon.module.scss";

export default function ComingSoon() {
  return (
    <div className={styles.container}>
      <Image
        src={"/images/coming_soon.png"}
        width={261}
        height={261}
        alt="coming_soon"
      />
      <div className={styles.text}>Coming Soon!</div>
    </div>
  );
}

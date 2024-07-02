import Menu from "@/components/Menu";
import styles from "@/styles/Friends.module.scss";

import Menu from "@/components/Menu";
import styles from "@/styles/Friends.module.scss";

export default function Friends() {
  return (<div className={styles.friends}>
    <Menu/>
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.main}>Invite friends!</div>
        <div className={styles.sub}>You and your friend will receive bonuses</div>
      </div>
    </div>
  </div>);
}

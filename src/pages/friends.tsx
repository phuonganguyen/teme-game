import Menu from "@/components/Menu";
import styles from "@/styles/Friends.module.scss";
import Image from "next/image";

export default function Friends() {
  return (<div className={styles.friends}>
    <Menu/>
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.main}>Invite friends!</div>
        <div className={styles.sub}>You and your friend will receive bonuses</div>
      </div>
      <div className={styles.rewards}>
        <div className={styles.item}>
          <Image src={"/images/gift1.png"} width={52} height={52} alt="gift1" />
          <div className={styles.content}>
            <div className={styles.title}>Invite a friend</div>
            <div className={styles.sub}>
              <Image src="/images/coins.png" width={24} height={24} alt=""/>
              <div><span className={styles.number}>+5,000</span> for you and <span className={styles.number}>+2,500</span> for your friend</div>
            </div>
          </div>
        </div>
        <div className={styles.item}>
          <Image src={"/images/gift2.png"} width={52} height={52} alt="gift2" />
          <div className={styles.content}>
            <div className={styles.title}>Invite a friend with Telegram Premium</div>
            <div className={styles.sub}>
              <Image src="/images/coins.png" width={24} height={24} alt=""/>
              <div><span className={styles.number}>+25,000</span> for you and <span className={styles.number}>+10,000</span> for your friend</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>);
}

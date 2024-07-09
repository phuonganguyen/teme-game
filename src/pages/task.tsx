import ComingSoon from "@/components/ComingSoon";
import {
  IconCalendar,
  IconTelegram,
  IconX,
  IconYoutube,
} from "@/components/Icons";
import Layout from "@/components/Layout";
import TaskDetail from "@/components/TaskDetail";
import TaskItem from "@/components/TaskItem";
import Title from "@/components/Title";

import styles from "@/styles/Task.module.scss";
import Image from "next/image";

export default function Task() {
  return (
    <Layout>
      <div className={styles.container}>
        <Title main="Earn more coins" />
        <div className={styles.cat}>
          <Image
            src={"/images/task/cat.png"}
            height={190}
            width={190}
            alt="task_cat"
          />
        </div>

        <div className={styles.content}>
          <div className={styles.tasks}>
            <div className={styles.title}>Daily tasks</div>
            <TaskItem href={"#"}>
              <IconCalendar />
              <TaskDetail name="Checkin daily" coinReward={5000} />
            </TaskItem>
            <TaskItem
              href={"https://x.com/Temecoinxyz/status/1810315359028957566"}
            >
              <IconX />
              <TaskDetail name="Retweet post" coinReward={5000} />
            </TaskItem>
            <TaskItem
              href={"https://x.com/Temecoinxyz/status/1810315359028957566"}
            >
              <IconX />
              <TaskDetail name="Comment post" coinReward={5000} />
            </TaskItem>
          </div>
          <div className={styles.tasks}>
            <div className={styles.tabs}>
              <div className={`${styles.tab} ${styles.active}`}>
                Task social
              </div>
              <div className={styles.tab}>Upgrade earn per hour</div>
            </div>
            <TaskItem href={"https://t.me/Temecoinxyz"}>
              <IconTelegram />
              <TaskDetail
                name="Join our Telegram Announcement"
                coinReward={5000}
              />
            </TaskItem>
            <TaskItem href={"https://t.me/Temecoinxyz"}>
              <IconTelegram />
              <TaskDetail
                name="Join our Telegram group chat"
                coinReward={5000}
              />
            </TaskItem>
            <TaskItem href={"https://x.com/Temecoinxyz"}>
              <IconX />
              <TaskDetail name="Follow our X account" coinReward={5000} />
            </TaskItem>
            <TaskItem href={"https://youtube.com/@Temecoinxyz"}>
              <IconYoutube />
              <TaskDetail name="Subscribe our Youtube" coinReward={5000} />
            </TaskItem>
            <TaskItem href={"/friends"}>
              <IconYoutube />
              <TaskDetail name="Invite 3 friends" coinReward={15000} />
            </TaskItem>
          </div>
        </div>
      </div>
    </Layout>
  );
}

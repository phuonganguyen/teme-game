import {
  IconCalendar,
  IconFriends,
  IconTelegram,
  IconX,
  IconYoutube,
} from "@/components/Icons";
import Layout from "@/components/Layout";
import TaskDetail from "@/components/TaskDetail";
import TaskItem from "@/components/TaskItem";
import TaskList from "@/components/TaskList";
import Title from "@/components/Title";

import styles from "@/styles/Task.module.scss";
import Image from "next/image";
import Popup from "reactjs-popup";

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
            <TaskItem>
              <IconCalendar />
              <TaskDetail name="Checkin daily" coinReward={5000} />
            </TaskItem>
            <TaskItem>
              <IconX />
              <TaskDetail name="Retweet post" coinReward={5000} />
            </TaskItem>
            <TaskItem>
              <IconX />
              <TaskDetail name="Comment post" coinReward={5000} />
            </TaskItem>
          </div>
          <div className={styles.tasks}>
            <TaskList />
            <Popup trigger={<button> Trigger</button>} position="right center">
              <div>Popup content here !!</div>
            </Popup>
          </div>
        </div>
      </div>
    </Layout>
  );
}

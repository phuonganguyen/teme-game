import ComingSoon from "@/components/ComingSoon";
import { IconCalendar } from "@/components/Icons";
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
          <div className={styles.daily}>
            <div className={styles.title}>Daily tasks</div>
            <TaskItem href={"#"}>
              <IconCalendar />
              <TaskDetail name="Checkin daily" coinReward={5000} />
            </TaskItem>
          </div>
        </div>
      </div>
    </Layout>
  );
}

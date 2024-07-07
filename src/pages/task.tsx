import Layout from "@/components/Layout";
import Title from "@/components/Title";

import styles from "@/styles/Task.module.scss";
import Image from "next/image";

export default function Task() {
  return (
    <Layout>
      <div className={styles.container}>
        <Title main="Earn more coins" />
        <Image src={"/images/task/cat.png"} width={190} height={190} alt="task_cat" />
      </div>
    </Layout>
  );
}

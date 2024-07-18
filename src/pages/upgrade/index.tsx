import { getIronSession, IronSessionData } from "iron-session";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";

import { IconCoin } from "@/components/Icons";
import { IconLevel1 } from "@/components/Icons/Levels";
import Image from "@/components/Image";
import Layout from "@/components/Layout";
import { rewardPerHour, titleNameMapper } from "@/constants";
import { sessionOptions } from "@/libs/session";
import styles from "@/styles/upgrade/UpgradeCat.module.scss";

export default function UpgradeCat({
  session,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [currenCoin, setCurrentCoin] = useState(0);
  const level = 1;
  const max = 10000;
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.title}>
          {titleNameMapper[level]}
          <div className={styles["sub-title"]}>
            Earn per hour
            <span className={styles.coin}>
              <IconCoin width={32} height={32} /> {rewardPerHour[level]}
            </span>
          </div>
        </div>
        <div className={styles.cat}>
          <Image
            src={"/images/cats/level_1.png"}
            width={250}
            height={250}
            alt="cat"
          />
          <IconLevel1 width={52} height={52} />
        </div>
        <div className={styles.upgrade}>
          <progress
            className={styles["progress-bar"]}
            value={currenCoin}
            max={max}
          >
            {currenCoin}%
          </progress>
          <button className={styles["btn-upgrade"]}>Up Level</button>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = (async (context) => {
  const session = await getIronSession<IronSessionData>(
    context.req,
    context.res,
    sessionOptions
  );

  // if (!session.isLoggedIn) {
  //   return {
  //     redirect: {
  //       destination: "/login",
  //       permanent: false,
  //     },
  //   };
  // }

  return { props: { session } };
}) satisfies GetServerSideProps<{ session: IronSessionData }>;

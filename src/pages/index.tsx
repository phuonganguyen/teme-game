import { getIronSession, IronSessionData } from 'iron-session';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Energy from '@/components/Energy';
import { IconCoin } from '@/components/Icons';
import Image from '@/components/Image';
import Layout from '@/components/Layout';
import LevelBar from '@/components/LevelBar';
import Profits from '@/components/Profits';
import { earnPerTap } from '@/constants';
import { sessionOptions } from '@/libs/session';
import { UserEnergy } from '@/models';
import UserService from '@/services/user-service';
import styles from '@/styles/Home.module.scss';
import { formatNumber } from '@/utils';

import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
export default function Index({
  session,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [coins, setCoins] = useState(0);
  const [clickQueue, setClickQueue] = useState<{ [key: string]: number }>({});
  const [userEnergy, setUserEnergy] = useState<UserEnergy>(undefined);

  const getResources = async () => {
    var { coins, energy } = await UserService.getResources();
    setCoins(coins);
    setUserEnergy(energy);
  };

  useEffect(() => {
    if (session.tgChatId) {
      getResources();
    }
  }, [session.tgChatId]);

  const addClickQueue = () => {
    const key = uuidv4();
    var queue = clickQueue;
    queue[key] = earnPerTap[session.level];
    setClickQueue(queue);

    setTimeout(() => {
      removeClickQueue(key);
    }, 1000);
  };

  const removeClickQueue = (key: string) => {
    const queue = clickQueue;
    delete queue[key];
    setClickQueue(queue);
  };

  const handleCatClick = async () => {
    window.Telegram.WebApp.HapticFeedback.selectionChanged();
    const response = await fetch("/api/user/tap", { method: "POST" });
    const result = await response.json();
    if (result.isSuccess) {
      getResources();
      addClickQueue();
    }
  };

  return (
    <Layout>
      <div className={styles.mining}>
        <div className={styles.top}>
          <div className={styles.username}>
            <Image src="/images/logo.png" width={32} height={32} alt="logo" />
            <div className={styles.name}>
              <div className={styles.bg}>
                <Image
                  src={"/images/home/usernamebg.svg"}
                  width={85.583}
                  height={25.739}
                  alt=""
                />
              </div>
              {session.username.length > 10
                ? `${session.username.substring(0, 9)}...`
                : session.username}
            </div>
          </div>
          <button className={styles["btn-exchange"]}>
            Choose your exchange
          </button>
        </div>
        <div className={styles.coin}>
          <IconCoin width={50} height={50} />
          {formatNumber(coins)}
        </div>
        <div className={styles["top-bar"]}>
          <Link className={styles.item} href={"#"}>
            <Image
              src="/images/icons/shop.png"
              width={26}
              height={26}
              alt="shop"
            />
            <div className={styles.text}>Shop</div>
          </Link>
          <LevelBar level={session.level} currenCoin={coins} />
          <Link className={styles.item} href={"#"}>
            <Image
              src="/images/icons/rocket.png"
              width={32}
              height={24}
              alt="boost"
            />
            <div className={styles.text}>Boost</div>
          </Link>
        </div>
        <div className={styles.cat} onClick={handleCatClick}>
          <Image
            src={"/images/cats/level_1.png"}
            width={225}
            height={225}
            alt="cat"
          />
          {Object.entries(clickQueue).map(([key, value]) => (
            <Profits key={key} value={value} />
          ))}
          {userEnergy && (
            <Energy
              level={session.level}
              energy={userEnergy.energy}
              resetTime={userEnergy.time}
            />
          )}
        </div>
        <div className={styles.claim}>
          <div className={styles.rectangle}>
            <div className={styles.info}>
              Total earn per hour
              <div className={styles.coin}>
                <IconCoin width={15.4} height={15.4} />
                <span>+ 50</span>
              </div>
            </div>
          </div>
          <div className={styles.text}>Claim 50</div>
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

  if (!session.isLoggedIn) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: { session } };
}) satisfies GetServerSideProps<{ session: IronSessionData }>;

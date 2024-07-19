import confetti from 'canvas-confetti';
import { getIronSession, IronSessionData } from 'iron-session';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useEffect, useState } from 'react';

import { IconCoin } from '@/components/Icons';
import IconLevel from '@/components/Icons/Level';
import Image from '@/components/Image';
import Layout from '@/components/Layout';
import { catLevelUpMapper, rewardPerHour, titleNameMapper } from '@/constants';
import { sessionOptions } from '@/libs/session';
import UserService from '@/services/user-service';
import styles from '@/styles/upgrade/UpgradeCat.module.scss';

export default function UpgradeCat({
  session,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [currenCoin, setCurrentCoin] = useState(0);
  const [level, setLevel] = useState(session.level);
  const max = catLevelUpMapper[level];

  const getResources = async () => {
    const { coins } = await UserService.getResources();
    setCurrentCoin(coins);
  };

  useEffect(() => {
    if (session.tgChatId) {
      getResources();
    }
  }, [session]);

  const handleClick = async () => {
    var { isSuccess } = await UserService.upgradeCat();
    if (isSuccess) {
      await getResources();
      setLevel(level + 1);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.title}>
          {titleNameMapper[session.level]}
          <div className={styles["sub-title"]}>
            Earn per hour
            <span className={styles.coin}>
              <IconCoin width={32} height={32} /> {rewardPerHour[session.level]}
            </span>
          </div>
        </div>
        <div className={styles.cat}>
          <Image
            src={`/images/cats/level_${level}.png`}
            width={250}
            height={250}
            alt="cat"
          />
          <IconLevel level={level} width={52} height={52} />
        </div>
        <div className={styles.upgrade}>
          <div className={styles.energy}>
            <div className={styles.text}>
              Balance
              <span>
                {currenCoin}/{max}
              </span>
            </div>
            <progress
              className={styles["progress-bar"]}
              value={currenCoin}
              max={max}
            >
              {currenCoin}%
            </progress>
          </div>
          <button
            className={styles["btn-upgrade"]}
            onClick={handleClick}
            disabled={currenCoin < max}
          >
            Up Level
          </button>
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

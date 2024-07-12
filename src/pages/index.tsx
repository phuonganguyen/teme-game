import { sessionOptions } from "@/libs/session";
import { IronSessionData, getIronSession } from "iron-session";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import styles from "@/styles/Home.module.scss";
import Image from "@/components/Image";
import Layout from "@/components/Layout";
import { formatNumber } from "@/utils";
import { useEffect, useState } from "react";
import { IconCoin } from "@/components/Icons";

export default function Index({
  session,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    const getCoins = async () => {
      const response = await fetch("/api/coins");
      const data = await response.json();
      setCoins(data.coins);
    };

    if (session.tgChatId) {
      getCoins();
    }
  }, [session.tgChatId]);

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
              {session.username}
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
        {/* <div className={styles["top-bar"]}>
          <Link className={styles.item} href={"/shop"}>
            <Image
              src="/images/icons/shop.png"
              width={26}
              height={26}
              alt="shop"
            />
            <div className={styles.text}>Shop</div>
          </Link>
          <div className={styles.level}>
            <IconLevel1 />
            <div className={styles.process}>
              <div className={styles.text}>0 / 10K</div>
            </div>
            <button className={styles["btn-up"]}>
              <IconArrowUp />
              Up
            </button>
          </div>
          <Link className={styles.item} href={"#"}>
            <Image
              src="/images/icons/rocket.png"
              width={26}
              height={26}
              alt="shop"
            />
            <div className={styles.text}>Boost</div>
          </Link>
        </div> */}
        <div className={styles.cat}>
          <Image
            src={"/images/cats/level_1.png"}
            width={225}
            height={225}
            alt="cat"
          />
        </div>
        <div className={styles.claim}>
          <div className={styles.rectangle}></div>
          Claim 5
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
}) satisfies GetServerSideProps<{
  session: IronSessionData;
}>;

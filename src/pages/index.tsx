import { sessionOptions } from "@/libs/session";
import { IronSessionData, getIronSession } from "iron-session";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import styles from "@/styles/Home.module.scss";
import Image from "next/image";
import Layout from "@/components/Layout";
import { formatNumber } from "@/utils";

export default function Index({
  session,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
          <Image src="/images/coins.png" width={50} height={50} alt="coins" />
          {formatNumber(session.coins)}
        </div>
        <div className={styles.cat}>
          <Image
            src={"/images/cats/level_1.png"}
            width={225}
            height={225}
            alt="cat"
          />
        </div>
        <div className={styles["coming-soon"]}>Coming Soon!</div>
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

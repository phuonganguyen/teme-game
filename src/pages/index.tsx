import { sessionOptions } from "@/libs/session";
import { IronSessionData, getIronSession } from "iron-session";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import styles from "@/styles/Home.module.scss";
import Menu from "@/components/Menu";
import Image from "next/image";

export default function Index({
  session,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className={styles.home}>
      <Menu />
      <div className={styles.mining}>
        <div className={styles.top}>
          <div className={styles.username}>
            <Image src="/images/logo.png" width={50} height={50} alt="logo" />
            {session.username}
          </div>
          <button className={styles["btn-exchange"]}>
            Choose your exchange
          </button>
        </div>
        <div className={styles.coin}>
          <Image src="/images/coins.png" width={70} height={70} alt="coins" />
          {session.coins}
        </div>
        <div className={styles.cat}>
          <Image
            src={"/images/home/cat.png"}
            width={350}
            height={350}
            alt="cat"
          />
        </div>
      </div>
    </main>
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

import { IconCopy } from "@/components/Icons";
import Layout from "@/components/Layout";
import { sessionOptions } from "@/libs/session";
import styles from "@/styles/Friends.module.scss";
import { IronSessionData, getIronSession } from "iron-session";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import { useState } from "react";
import { Tooltip } from "react-tooltip";

export default function Friends({
  session,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const refUrl=`https://t.me/temecoin_bot?start=${session.tgChatId}`;
  const [isOpen, setIsOpen]=useState(false);

  const handleCopyClick=()=>{
    navigator.clipboard.writeText(refUrl);
    setIsOpen(true);
    setTimeout(()=>{
      setIsOpen(false);
    },3000)
  }
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.main}>Invite friends!</div>
          <div className={styles.sub}>You and your friend will receive bonuses</div>
        </div>
        <div className={styles.rewards}>
          <div className={styles.item}>
            <Image src={"/images/gift1.png"} width={48} height={48} alt="gift1" />
            <div className={styles.content}>
              <div className={styles.title}>Invite a friend</div>
              <div className={styles.sub}>
                <Image src="/images/coins.png" width={20} height={20} alt=""/>
                <div><span className={styles.number}>+5,000</span> for you and <span className={styles.number}>+2,500</span> for your friend</div>
              </div>
            </div>
          </div>
          <div className={styles.item}>
            <Image src={"/images/gift2.png"} width={48} height={48} alt="gift2" />
            <div className={styles.content}>
              <div className={styles.title}>Invite a friend with Telegram Premium</div>
              <div className={styles.sub}>
                <Image src="/images/coins.png" width={20} height={20} alt=""/>
                <div><span className={styles.number}>+25,000</span> for you and <span className={styles.number}>+10,000</span> for your friend</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles["friend-list"]}>
          <div className={styles.title}>List of your friends (2)</div>
          <div className={styles.list}>
            You haven&apos;t invited anyone yet
          </div>
        </div>
        <div className={styles.buttons}>
          <a href="tg://msg?text=your MsG!" id="telegram_share" className={styles["btn-invite"]} title="inviteFriends">+ Invite a friend</a>
          <button id="btn-copy" className={styles["btn-copy"]} onClick={handleCopyClick}><IconCopy/></button>
        </div>
      </div>
      <Tooltip anchorSelect="#btn-copy" content="Copied!" isOpen={isOpen} />
    </Layout>);
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
import { IconCopy } from "@/components/Icons";
import Layout from "@/components/Layout";
import { sessionOptions } from "@/libs/session";
import styles from "@/styles/Friends.module.scss";
import Friend from "@/types/friend";
import { formatNumber } from "@/utils";
import { IronSessionData, getIronSession } from "iron-session";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";

export default function Friends({
  session,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const refUrl = `https://t.me/temecoin_bot?start=${session.tgChatId}`;
  const message =
    "Play with me, become the pioneer Set To DOMINATE All Memes and get a token airdrop!\
  💸 +2k Coins as a first-time gift\
  🔥 +25k Coins if you have Telegram Premium";

  const [isOpen, setIsOpen] = useState(false);
  const [friends, setFriends] = useState<Friend[]>([]);

  useEffect(() => {
    const getFriends = async () => {
      const response = await fetch("/api/friends");
      const data = await response.json();
      setFriends(data.friends);
    };

    if (session.tgChatId) {
      getFriends();
    }
  }, [session.tgChatId]);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(refUrl);
    setIsOpen(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 3000);
  };

  const renderFriends = () => {
    if (friends && friends.length > 0) {
      return friends.map(({ id, username, coins }) => (
        <div key={id} className={styles.friend}>
          <div className={styles.left}>
            <Image
              src={"/images/friend_cat.png"}
              width={32}
              height={32}
              alt={id}
            />
            <div>{username}</div>
          </div>
          <div className={styles.right}>
            <Image src={"/images/coins.png"} width={25} height={25} alt="c" />
            <div>{`+ ${formatNumber(coins)}`}</div>
          </div>
        </div>
      ));
    }

    return "You haven't invited anyone yet";
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.intro}>
          <div className={styles.title}>
            <div className={styles.main}>Invite friends!</div>
            <div className={styles.sub}>
              You and your friend will receive bonuses
            </div>
          </div>
          <div className={styles.rewards}>
            <div className={styles.item}>
              <Image
                src={"/images/gift1.png"}
                width={40}
                height={40}
                alt="gift1"
              />
              <div className={styles.content}>
                <div className={styles.title}>Invite a friend</div>
                <div className={styles.sub}>
                  <Image
                    src="/images/coins.png"
                    width={20}
                    height={20}
                    alt=""
                  />
                  <div>
                    <span className={styles.number}>+5,000</span> for you and{" "}
                    <span className={styles.number}>+2,500</span> for your
                    friend
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.item}>
              <Image
                src={"/images/gift2.png"}
                width={40}
                height={40}
                alt="gift2"
              />
              <div className={styles.content}>
                <div className={styles.title}>
                  Invite a friend with Telegram Premium
                </div>
                <div className={styles.sub}>
                  <Image
                    src="/images/coins.png"
                    width={20}
                    height={20}
                    alt=""
                  />
                  <div>
                    <span className={styles.number}>+25,000</span> for you and{" "}
                    <span className={styles.number}>+10,000</span> for your
                    friend
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles["friend-list"]}>
          <div className={styles.title}>
            {`Total friends (${friends.length})`}
          </div>
          <div className={styles.list}>{renderFriends()}</div>
        </div>
        <div className={styles.buttons}>
          <a
            target="_blank"
            href={`https://t.me/share/url?url=${refUrl}&text=${message}`}
            className={`${styles["btn"]} ${styles["btn-invite"]}`}
            title="inviteFriends"
          >
            + Invite a friend
          </a>
          <a id="btn-copy" className={styles["btn"]} onClick={handleCopyClick}>
            <IconCopy />
          </a>
        </div>
      </div>
      <Tooltip anchorSelect="#btn-copy" content="Copied!" isOpen={isOpen} />
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

import { getIronSession, IronSessionData } from "iron-session";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

import Image from "@/components/Image";
import { sessionOptions } from "@/libs/session";
import styles from "@/styles/Age.module.scss";
import { formatNumber } from "@/utils";

export default function AgePage({
  session,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const { isPremium, age, ageReward, tgChatId } = session;

  const handleContinueClick = () => {
    if (step == 1) {
      setStep(isPremium ? 2 : 3);
      return;
    }

    if (step == 2) {
      setStep(3);
      return;
    }

    router.push("/");
  };

  const renderStepContent = () => {
    if (step == 1) {
      return <Age age={age} id={tgChatId} />;
    }

    if (step == 2) {
      return <Premium />;
    }

    return <Reward reward={ageReward} />;
  };

  return (
    <div className={styles.container}>
      <div className={styles.slider}>
        <div
          className={`${styles.item} ${step == 1 ? styles.active : ""}`}
        ></div>
        {isPremium && (
          <div
            className={`${styles.item} ${step == 2 ? styles.active : ""}`}
          ></div>
        )}
        <div
          className={`${styles.item} ${step == 3 ? styles.active : ""}`}
        ></div>
      </div>
      <div className={styles.inner}>{renderStepContent()}</div>
      <button onClick={handleContinueClick} className={styles["btn-continue"]}>
        Continue
      </button>
    </div>
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

function Age({ age, id }: { age: number; id: number }) {
  return (
    <>
      <div className={styles.title}>
        Rising Star!<div className={styles.sub}>You’ve joined Telegram</div>
      </div>
      <div className={styles.age}>
        <div className={styles.number}>{age}</div>
        years ago
      </div>
      <div className={styles.note}>
        Your account number is #{id}. You’re in the Top 70% Telegram users
      </div>
    </>
  );
}

function Premium() {
  return (
    <>
      <div className={styles.title}>
        Telegram Premium
        <div className={styles.sub}>You know how to get the best</div>
      </div>
      <div className={styles.age}>
        <Image
          src={"/images/check-account/premium.png"}
          width={208}
          height={208}
          alt="premium"
          style={{ borderRadius: "16px" }}
        />
        Premium user
      </div>
      <div className={styles.note}>Status confirmed</div>
    </>
  );
}

function Reward({ reward }: { reward: number }) {
  return (
    <>
      <div className={styles.title}>
        You are amazing!
        <div className={styles.sub}>Here is TEME rewards</div>
      </div>
      <div className={styles.age}>
        <Image
          src={"/images/check-account/teme.png"}
          width={208}
          height={208}
          alt="premium"
        />
        {formatNumber(reward)}
      </div>
      <div className={styles.note}>Thanks for your time on Telegram 🤝</div>
    </>
  );
}

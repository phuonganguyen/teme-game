import { useRouter } from 'next/router';
import { useState } from 'react';

import Image from '@/components/Image';
import { formatNumber } from '@/utils';

import styles from './VerifyResult.module.scss';

type Props = {
  isPremium: boolean;
  age: number;
  reward: number;
};

function Age({ age }: { age: number }) {
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
        Your account number is #5009738555. You’re in the Top 70% Telegram users
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

export default function VerifyAccountResult({ isPremium, age, reward }: Props) {
  const [step, setStep] = useState(1);
  const router = useRouter();

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
      return <Age age={age} />;
    }

    if (step == 2) {
      return <Premium />;
    }

    return <Reward reward={reward} />;
  };

  return (
    <div className={styles.container}>
      <div className={styles.slider}>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        {isPremium && <div className={styles.item}></div>}
      </div>
      <div className={styles.inner}>{renderStepContent()}</div>
      <button onClick={handleContinueClick} className={styles["btn-continue"]}>
        Continue
      </button>
    </div>
  );
}

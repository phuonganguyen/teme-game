import { useCallback, useEffect, useState } from "react";
import styles from "@/styles/Login.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { CustomWindow } from "@/types/custom.window";

declare let window: CustomWindow;

export default function Login() {
  const router = useRouter();
  const [currentValue, setCurrentValue] = useState(0);
  const maxValue = 100;

  const increment = useCallback(() => {
    if (currentValue === maxValue) {
      setCurrentValue(0);
    } else {
      setCurrentValue((v) => v + 10);
    }
  }, [setCurrentValue, currentValue]);

  useEffect(() => {
    const r = setInterval(() => {
      increment();
    }, 1000);

    return () => {
      clearInterval(r);
    };
  }, [increment]);

  useEffect(() => {
    const login = async () => {
      const telegramInitData = window.Telegram.WebApp.initData || null;

      if (!telegramInitData) {
        router.push("/unauthorized");
      }

      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ telegramInitData }),
      });

      const authData = await response.json();

      if (authData.isLoggedIn) {
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } else {
        router.push("/unauthorized");
      }
    };

    if (router.isReady) {
      login();
    }
  }, [router]);

  return (
    <div className={`${styles.loading}`}>
      <div className={styles.cat}>
        <Image
          src={"/images/loading/cat.png"}
          width={250}
          height={250}
          alt="cat-loading"
        />
      </div>
      <div className={styles.content}>
        <Image
          src={"/images/loading/teme.svg"}
          width={225}
          height={65}
          alt="teme-loading"
        />
        <div className={styles.text}>
          The first meme coin, AI , Gaming & re-Staking and RWA. TEME Is Set To
          DOMINATE All Memes!
        </div>
        <progress
          className={styles.progressBar}
          value={currentValue}
          max={maxValue}
        >
          {currentValue}%
        </progress>
        <div className={styles.icons}>
          <Image
            src={"/images/loading/Icon_web.png"}
            width={49}
            height={49}
            alt="web"
          />
          <Image
            src={"/images/loading/Icon_X.png"}
            width={49}
            height={49}
            alt="x"
          />
          <Image
            src={"/images/loading/Icon_TELE.png"}
            width={49}
            height={49}
            alt="tele"
          />
          <Image
            src={"/images/loading/Icon_Youtube.png"}
            width={49}
            height={49}
            alt="youtube"
          />
        </div>
      </div>
    </div>
  );
}

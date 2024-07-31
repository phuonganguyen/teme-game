import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

import { IconTelegram, IconWeb, IconX, IconYoutube } from "@/components/Icons";
import Image from "@/components/Image";
import styles from "@/styles/Login.module.scss";

export default function Login() {
  const router = useRouter();
  const [currentValue, setCurrentValue] = useState(0);
  const maxValue = 100;
  const [webApp, setWebApp] = useState<WebApp | null>(null);

  useEffect(() => {
    const app = window.Telegram.WebApp;
    if (app) {
      app.ready();
      app.expand();
      setWebApp(app);
    }
  }, []);

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
      if (webApp?.platform == "web") {
        router.push("/unsupport");
        return;
      }

      const telegramInitData = webApp?.initData;

      if (!telegramInitData) {
        router.push("/unauthorized");
        return;
      }

      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ telegramInitData }),
      });

      const authData = await response.json();

      if (authData.isLoggedIn) {
        setTimeout(() => {
          router.push(authData.firstClaimed ? "/" : "/check-account");
        }, 3000);
      } else {
        router.push("/unauthorized");
      }
    };

    if (router.isReady && webApp) {
      login();
    }
  }, [router, webApp]);

  return (
    <div className={`${styles.loading}`}>
      <div className={styles.cat}>
        <Image
          src={"/images/loading/cat.png"}
          width={270}
          height={272}
          alt="cat-loading"
        />
      </div>
      <div className={styles.content}>
        <Image
          src={"/images/loading/teme.svg"}
          width={161}
          height={51}
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
          <IconWeb height={40} width={40} />
          <IconX height={40} width={40} />
          <IconTelegram height={40} width={40} />
          <IconYoutube height={40} width={40} />
        </div>
      </div>
    </div>
  );
}

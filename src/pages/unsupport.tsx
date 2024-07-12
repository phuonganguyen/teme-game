import styles from "@/styles/UnSupport.module.scss";
import Image from "@/components/Image";
import { useEffect, useState } from "react";

export default function UnSupport() {
  const [webApp, setWebApp] = useState<WebApp | null>(null);

  useEffect(() => {
    const app = window.Telegram.WebApp;
    if (app) {
      app.ready();
      app.expand();
      setWebApp(app);
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.center}>
        <div className={styles.content}>
          <p>Play on your app or mobile</p>
          <a href="https://t.me/temecoin_bot" rel="noopener noreferrer">
            <Image
              src={"/images/qrcode.png"}
              height={240}
              width={240}
              alt="@temecoin_bot"
            />
          </a>
          <a href="https://t.me/temecoin_bot" rel="noopener noreferrer">
            @temecoin_bot
          </a>
          <p
            className={styles.version}
          >{`${webApp?.platform} ${webApp?.version}`}</p>
        </div>
      </div>
    </div>
  );
}

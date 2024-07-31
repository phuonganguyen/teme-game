import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import styles from "@/styles/CheckAccount.module.scss";

export default function CheckAccount() {
  const [agePercent, setAgePercent] = useState(0);
  const [levelPercent, setLevelPercent] = useState(0);
  const [premiumPercent, setPremiumPercent] = useState(0);
  const [statusPercent, setStatusPercent] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const ageInterval = setInterval(() => {
      if (agePercent >= 100) {
        clearInterval(ageInterval);
      } else {
        setAgePercent(agePercent + Math.floor(Math.random() * 50));
      }
    }, 1000);

    return () => clearInterval(ageInterval);
  }, [agePercent]);

  useEffect(() => {
    const levelInterval = setInterval(() => {
      if (levelPercent >= 100) {
        clearInterval(levelInterval);
      } else {
        setLevelPercent(levelPercent + Math.floor(Math.random() * 50));
      }
    }, 1000);

    return () => clearInterval(levelInterval);
  }, [levelPercent]);

  useEffect(() => {
    const premiumInterval = setInterval(() => {
      if (premiumPercent >= 100) {
        clearInterval(premiumInterval);
      } else {
        setPremiumPercent(premiumPercent + Math.floor(Math.random() * 50));
      }
    }, 1000);

    return () => clearInterval(premiumInterval);
  }, [premiumPercent]);

  useEffect(() => {
    const statusInterval = setInterval(() => {
      if (statusPercent >= 100) {
        clearInterval(statusInterval);
      } else {
        setStatusPercent(statusPercent + Math.floor(Math.random() * 50));
      }
    }, 1000);

    return () => clearInterval(statusInterval);
  }, [statusPercent]);

  const handleContinueClick = () => {
    router.push("/age");
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Checking your account</div>
      <div className={styles.items}>
        <div className={styles.item}>
          <div className={styles.name}>
            Account Age Verified
            <IconChecked checked={agePercent >= 100} />
          </div>
          <progress className={styles.progressBar} value={agePercent} max={100}>
            {agePercent}%
          </progress>
        </div>
        <div className={styles.item}>
          <div className={styles.name}>
            Activity Level Analyzed
            <IconChecked checked={levelPercent >= 100} />
          </div>
          <progress
            className={styles.progressBar}
            value={levelPercent}
            max={100}
          >
            {levelPercent}%
          </progress>
        </div>
        <div className={styles.item}>
          <div className={styles.name}>
            Telegram Premium Checked
            <IconChecked checked={premiumPercent >= 100} />
          </div>
          <progress
            className={styles.progressBar}
            value={premiumPercent}
            max={100}
          >
            {premiumPercent}%
          </progress>
        </div>
        <div className={styles.item}>
          <div className={styles.name}>
            OG Status Confirmed
            <IconChecked checked={statusPercent >= 100} />
          </div>
          <progress
            className={styles.progressBar}
            value={statusPercent}
            max={100}
          >
            {statusPercent}%
          </progress>
        </div>
      </div>
      <button
        onClick={handleContinueClick}
        className={styles["btn-continue"]}
        disabled={
          agePercent < 100 ||
          statusPercent < 100 ||
          premiumPercent < 100 ||
          levelPercent < 100
        }
      >
        Continue
      </button>
    </div>
  );
}

export const IconChecked = ({ checked }: { checked: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="none"
  >
    <path
      d="M8.75614 1.84091C8.16252 1.64881 7.51989 1.67444 6.94345 1.91319C6.36701 2.15194 5.89446 2.58821 5.61052 3.14379L4.90527 4.52366C4.82146 4.68784 4.68794 4.82135 4.52377 4.90516L3.14389 5.60954C2.58812 5.89351 2.15172 6.3662 1.91295 6.94283C1.67418 7.51946 1.64868 8.1623 1.84102 8.75604L2.31789 10.2304C2.37461 10.4056 2.37461 10.5942 2.31789 10.7694L1.84102 12.2438C1.64898 12.8375 1.67474 13.4802 1.91366 14.0567C2.15258 14.6331 2.58903 15.1056 3.14477 15.3894L4.52377 16.0947C4.68794 16.1785 4.82146 16.312 4.90527 16.4762L5.61052 17.856C5.89432 18.4118 6.3668 18.8482 6.94326 19.0871C7.51971 19.3261 8.16242 19.3518 8.75614 19.1598L10.2305 18.682C10.4057 18.6253 10.5943 18.6253 10.7695 18.682L12.2439 19.1589C12.8377 19.3512 13.4806 19.3255 14.0573 19.0866C14.6339 18.8477 15.1066 18.4111 15.3904 17.8552L16.0956 16.4762C16.1792 16.3121 16.3124 16.1786 16.4763 16.0947L17.8561 15.3894C18.4119 15.1056 18.8483 14.6331 19.0872 14.0567C19.3262 13.4802 19.3519 12.8375 19.1599 12.2438L18.6821 10.7694C18.6254 10.5942 18.6254 10.4056 18.6821 10.2304L19.1599 8.75604C19.3522 8.1622 19.3265 7.51929 19.0876 6.94264C18.8487 6.36599 18.4121 5.89336 17.8561 5.60954L16.4763 4.90516C16.3124 4.82121 16.1792 4.68771 16.0956 4.52366L15.3904 3.14379C15.1066 2.58786 14.6339 2.15127 14.0573 1.91234C13.4806 1.6734 12.8377 1.64777 12.2439 1.84004L10.7695 2.31779C10.5943 2.3745 10.4057 2.3745 10.2305 2.31779L8.75614 1.84091ZM7.16889 3.94004C7.26343 3.7548 7.42086 3.6093 7.61295 3.52961C7.80504 3.44992 8.01924 3.44125 8.21714 3.50516L9.69152 3.98291C10.2171 4.15306 10.7829 4.15306 11.3085 3.98291L12.7829 3.50516C12.9809 3.44102 13.1953 3.44956 13.3876 3.52927C13.5799 3.60897 13.7374 3.75461 13.832 3.94004L14.5364 5.31991C14.7877 5.81198 15.1879 6.21219 15.68 6.46354L17.0599 7.16791C17.2453 7.26248 17.391 7.42005 17.4707 7.61234C17.5504 7.80462 17.5589 8.01902 17.4948 8.21704L17.017 9.69141C16.8469 10.217 16.8469 10.7828 17.017 11.3084L17.4948 12.7828C17.5587 12.9807 17.55 13.1949 17.4703 13.387C17.3906 13.5791 17.2451 13.7365 17.0599 13.831L15.68 14.5363C15.1879 14.7876 14.7877 15.1878 14.5364 15.6799L13.832 17.0598C13.7373 17.2451 13.5797 17.3905 13.3874 17.47C13.1951 17.5496 12.9808 17.558 12.7829 17.4938L11.3085 17.0169C10.7829 16.8468 10.2171 16.8468 9.69152 17.0169L8.21714 17.4938C8.01934 17.5578 7.80522 17.5492 7.61315 17.4697C7.42107 17.3902 7.26358 17.2449 7.16889 17.0598L6.46364 15.6799C6.2123 15.1878 5.81209 14.7876 5.32002 14.5363L3.94014 13.831C3.75507 13.7364 3.60975 13.5789 3.53023 13.3868C3.4507 13.1947 3.44216 12.9806 3.50614 12.7828L3.98302 11.3084C4.15316 10.7828 4.15316 10.217 3.98302 9.69141L3.50614 8.21704C3.44193 8.01912 3.45035 7.8048 3.52988 7.61253C3.60942 7.42026 3.75487 7.26263 3.94014 7.16791L5.32002 6.46354C5.81209 6.21219 6.2123 5.81198 6.46364 5.31991L7.16889 3.94004ZM5.91502 10.2873L9.62764 13.9999L15.8139 7.81279L14.5766 6.57554L9.62764 11.5254L7.15227 9.05004L5.91502 10.2873Z"
      fill={checked ? "#24B0FF" : "white"}
    />
  </svg>
);

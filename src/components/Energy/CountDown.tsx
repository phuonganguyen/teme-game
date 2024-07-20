import { timeout } from "cron";
import { useEffect, useState } from "react";

export default function CountDown() {
  const [remainingTime, setRemainingTime] = useState(timeout("0 */2 * * *"));

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(remainingTime - 1000);
    }, 1000);

    if (remainingTime <= 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, []);

  var hours = Math.floor(
    (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  var minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  return `~${hours}h ${minutes}m ${seconds}s`;
}

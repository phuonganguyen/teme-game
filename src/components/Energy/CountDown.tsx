import { parseExpression } from "cron-parser";
import { useEffect, useState } from "react";

export default function CountDown() {
  const expression = parseExpression("0 */2 * * *");
  const [nextTime, setNextTime] = useState(expression.next().getTime());
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const remainingTime = nextTime - now;
      var hours = Math.floor(
        (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor(
        (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
      );
      var seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);

      if (remainingTime <= 0) {
        setNextTime(expression.next().getTime());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [nextTime, expression]);

  return `~${hours}h ${minutes}m ${seconds}s`;
}

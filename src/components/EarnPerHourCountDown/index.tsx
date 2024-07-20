import { parseExpression } from "cron-parser";
import { useEffect, useState } from "react";

type Props = {
  onExpired: () => void;
};

export default function EarnPerHourCountDown({ onExpired }: Props) {
  const expression = parseExpression("0 */1 * * *");
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
        onExpired();
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [nextTime, expression, onExpired]);

  return `~${hours}h ${minutes}m ${seconds}s`;
}

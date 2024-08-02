import styles from "./Profits.module.scss";

export default function Profits({ value }: { value: number }) {
  return <div className={styles.profits}>+{value}</div>;
}

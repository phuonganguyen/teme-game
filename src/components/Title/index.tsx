import styles from "./Title.module.scss";

type Props = {
  main: string;
  sub?: string;
};

export default function Title({ main, sub = undefined }: Props) {
  return (
    <div className={styles.title}>
      <div className={styles.main}>{main}</div>
      {sub && <div className={styles.sub}>{sub}</div>}
    </div>
  );
}

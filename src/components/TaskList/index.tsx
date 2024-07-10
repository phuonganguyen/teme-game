import { IconFriends, IconTelegram, IconX, IconYoutube } from "../Icons";
import TaskDetail from "../TaskDetail";
import TaskItem from "../TaskItem";
import styles from "./TaskList.module.scss";

export default function TaskList() {
  const tasks = [
    {
      id: 1,
      name: "Join our Telegram Announcement",
      url: "https://t.me/Temecoinxyz",
      icon: <IconTelegram />,
      reward: 5000,
    },
    {
      id: 2,
      name: "Join our Telegram group chat",
      url: "https://t.me/Temecoinxyz",
      icon: <IconTelegram />,
      reward: 5000,
    },
    {
      id: 3,
      name: "Follow our X account",
      url: "https://x.com/Temecoinxyz",
      icon: <IconX />,
      reward: 5000,
    },
    {
      id: 4,
      name: "Subscribe our Youtube",
      url: "https://youtube.com/@Temecoinxyz",
      icon: <IconYoutube />,
      reward: 5000,
    },
    {
      id: 5,
      name: "Invite 3 friends",
      icon: <IconFriends />,
      reward: 15000,
    },
  ];

  return (
    <>
      <div className={styles.tabs}>
        <div className={`${styles.tab} ${styles.active}`}>Task social</div>
        <div className={styles.tab}>Upgrade earn per hour</div>
      </div>
      {tasks.map(({ id, icon, name, reward }) => (
        <TaskItem key={id}>
          {icon}
          <TaskDetail name={name} coinReward={reward} />
        </TaskItem>
      ))}
    </>
  );
}

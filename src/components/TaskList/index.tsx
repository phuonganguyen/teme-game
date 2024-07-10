import { useState } from "react";
import {
  IconCoin,
  IconFriends,
  IconTelegram,
  IconX,
  IconYoutube,
} from "../Icons";
import TaskDetail from "../TaskDetail";
import TaskItem from "../TaskItem";
import styles from "./TaskList.module.scss";
import Popup from "reactjs-popup";
import Task, { TaskType } from "@/types/task";

const IconClose = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
  >
    <path
      d="M4.26634 13.1668L3.33301 12.2335L7.06634 8.50016L3.33301 4.76683L4.26634 3.8335L7.99967 7.56683L11.733 3.8335L12.6663 4.76683L8.93301 8.50016L12.6663 12.2335L11.733 13.1668L7.99967 9.4335L4.26634 13.1668Z"
      fill="white"
    />
  </svg>
);

export default function TaskList() {
  const tasks: Task[] = [
    {
      id: 1,
      name: "Join our Telegram Announcement",
      url: "https://t.me/Temecoinxyz",
      type: TaskType.telegram,
      reward: 5000,
    },
    {
      id: 2,
      name: "Join our Telegram group chat",
      url: "https://t.me/Temecoinxyz",
      type: TaskType.telegram,
      reward: 5000,
    },
    {
      id: 3,
      name: "Follow our X account",
      url: "https://x.com/Temecoinxyz",
      type: TaskType.x,
      reward: 5000,
    },
    {
      id: 4,
      name: "Subscribe our Youtube",
      url: "https://youtube.com/@Temecoinxyz",
      type: TaskType.youtube,
      reward: 5000,
    },
    {
      id: 5,
      name: "Invite 3 friends",
      type: TaskType.friend,
      reward: 15000,
    },
  ];

  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const closeModal = () => {
    setOpen(false);
    setSelectedTask(undefined);
  };

  const renderIcon = (type: TaskType, width = 32, height = 32) => {
    switch (type) {
      case TaskType.telegram:
        return <IconTelegram {...{ width, height }} />;
      case TaskType.x:
        return <IconX {...{ width, height }} />;
      case TaskType.youtube:
        return <IconYoutube {...{ width, height }} />;
      case TaskType.friend:
        return <IconFriends {...{ width, height }} />;
    }
  };

  return (
    <>
      <div className={styles.tabs}>
        <div className={`${styles.tab} ${styles.active}`}>Task social</div>
        <div className={styles.tab}>Upgrade earn per hour</div>
      </div>
      {tasks.map(({ id, type, name, reward }) => (
        <TaskItem
          key={id}
          onClick={() => {
            setSelectedTask(tasks.find((t) => t.id === id));
            setOpen(true);
          }}
        >
          {renderIcon(type)}
          <TaskDetail name={name} coinReward={reward} />
        </TaskItem>
      ))}
      <Popup open={open} onClose={closeModal}>
        <div className={styles.modal}>
          <a className={styles.close} onClick={closeModal}>
            <IconClose />
          </a>
          {selectedTask && (
            <>
              {renderIcon(selectedTask.type, 120, 120)}
              <div className={styles["task-name"]}>{selectedTask.name}</div>
              <div className={styles.reward}>
                <IconCoin />
                {selectedTask.reward}
              </div>
              <button className={styles.button}>Open</button>
            </>
          )}
        </div>
      </Popup>
    </>
  );
}

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
        <div className="modal">
          <a className="close" onClick={closeModal}>
            &times;
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

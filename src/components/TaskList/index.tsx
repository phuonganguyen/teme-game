import { useEffect, useState } from "react";
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
import Task, { TaskResponse, TaskType } from "@/types/task";
import Result from "@/types/result";
import { Tooltip } from "react-tooltip";

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
  const [open, setOpen] = useState(false);
  const [openTooltip, setOpenTooltip] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [userTasks, setUserTasks] = useState<TaskResponse[]>([]);

  const createTask = async (taskId: number, reward: number) => {
    const response = await fetch("/api/tasks/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskId: taskId, reward: reward }),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await (response.json() as Promise<Result>);
  };

  const claimTask = async (taskId: number, reward: number) => {
    const response = await fetch("/api/tasks/claim", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskId: taskId, reward: reward }),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await (response.json() as Promise<Result>);
  };

  const handleClaim = async () => {
    if (selectedTask && selectedTask.url) {
      var result = await claimTask(selectedTask.id, selectedTask.reward);
      if (result.isSuccessful) {
        setOpen(false);
        setSelectedTask(undefined);
      } else {
        alert(result.message);
      }
    }
  };

  const handleOpen = async (taskId: number, reward: number, url: string) => {
    window.open(url, "_blank");
    const result = await createTask(taskId, reward);
    if (result.isSuccessful) {
      setOpen(false);
      setSelectedTask(undefined);
    } else {
      alert(result.message);
    }
  };

  const handleCheckInviteFriends = async (taskId: number, reward: number) => {
    const response = await fetch("/api/friends");
    const data = await response.json();
    if (data?.friends && data.friends.length >= 3) {
      const result = await createTask(taskId, reward);
      if (result.isSuccessful) {
        await claimTask(taskId, reward);
        setOpen(false);
        setSelectedTask(undefined);
      } 
    }else {
      setOpenTooltip(true);
    }
  };

  const tasks: Task[] = [
    {
      id: 1,
      name: "Join our Telegram Announcement",
      url: "https://t.me/Temecoinxyz",
      type: TaskType.telegram,
      reward: 5000,
      handler: handleOpen,
      buttonText: "Open",
    },
    {
      id: 2,
      name: "Join our Telegram group chat",
      url: "https://t.me/Temecoinxyz",
      type: TaskType.telegram,
      reward: 5000,
      handler: handleOpen,
      buttonText: "Open",
    },
    {
      id: 3,
      name: "Follow our X account",
      url: "https://x.com/Temecoinxyz",
      type: TaskType.x,
      reward: 5000,
      handler: handleOpen,
      buttonText: "Open",
    },
    {
      id: 4,
      name: "Subscribe our Youtube",
      url: "https://youtube.com/@Temecoinxyz",
      type: TaskType.youtube,
      reward: 5000,
      handler: handleOpen,
      buttonText: "Open",
    },
    {
      id: 5,
      name: "Invite 3 friends",
      type: TaskType.friend,
      reward: 15000,
      handler: handleCheckInviteFriends,
      buttonText: "Check",
    },
  ];

  const closeModal = () => {
    setOpen(false);
    setSelectedTask(undefined);
  };

  useEffect(() => {
    const getTasks = async () => {
      const response = await fetch("/api/user/tasks");
      const data = await response.json();
      setUserTasks(data.tasks);
    };

    getTasks();
  }, [open]);

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
      {tasks.map(({ id, type, name, reward }) => {
        const userTask = userTasks?.find(
          (x) => x.id.toString() === id.toString()
        );
        return (
          <TaskItem
            key={id}
            onClick={() => {
              setSelectedTask(tasks.find((t) => t.id === id));

              setOpen(true);
            }}
            completed={userTask?.claimed}
          >
            {renderIcon(type)}
            <TaskDetail name={name} coinReward={reward} />
          </TaskItem>
        );
      })}
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
              {userTasks?.find(
                (x) => x.id.toString() === selectedTask.id.toString()
              )?.claimed == false ? (
                <button className={styles.button} onClick={handleClaim}>
                  Claim
                </button>
              ) : (
                <button
                  data-tooltip-id="my-tooltip"
                  className={styles.button}
                  onClick={() =>
                    selectedTask.handler(
                      selectedTask.id,
                      selectedTask.reward,
                      selectedTask.url
                    )
                  }
                >
                  {selectedTask.buttonText}
                </button>
              )}
            </>
          )}
        </div>
      </Popup>
      <Tooltip
        id="my-tooltip"
        content="Task is not complete"
        isOpen={openTooltip}
      />
    </>
  );
}

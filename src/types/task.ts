export enum TaskType {
  telegram,
  x,
  youtube,
  friend,
}

export default interface Task {
  id: number;
  name: string;
  url?: string;
  reward: number;
  type: TaskType;
}

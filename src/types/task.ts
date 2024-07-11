export enum TaskType {
  telegram,
  x,
  youtube,
  friend,
}

export interface TaskResponse {
  id: number;
  claimed: boolean;
}

export default interface Task {
  id: number;
  name: string;
  url?: string;
  reward: number;
  type: TaskType;
  handler: (...args: any[]) => void;
  buttonText: string;
}

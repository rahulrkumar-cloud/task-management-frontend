export type TaskStatus = "Pending" | "InProgress" | "Completed";

export const statusIndexToText: Record<number, TaskStatus> = {
  0: "Pending",
  1: "InProgress",
  2: "Completed"
};

export const statusTextToIndex: Record<TaskStatus, number> = {
  Pending: 0,
  InProgress: 1,
  Completed: 2
};


export interface Task {
  taskId: number;
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
}

export interface TaskDto {
  title: string;
  description: string;
  dueDate: string;
  status?: TaskStatus;
}

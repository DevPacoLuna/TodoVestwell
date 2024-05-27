export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  parentTask: number;
  status: TaskStatus;
}

export interface TaskDAO {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  parentTask: number;
  status: TaskStatus;
}

export interface FiltersDTO {
  limit: number;
  page: number;
}

export enum TaskStatus {
  TODO = "To Do",
  INPROGRESS = "In progress",
  DONE = "Done",
}

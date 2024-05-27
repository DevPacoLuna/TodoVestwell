export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  parentTask: number;
  status: TaskStatus;
}

export interface TasksDAO {
  countTasks: number;
  tasks: TaskDAO[];
}

export interface TaskDAO {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  parentTask: number;
  childTasks: TaskDAO[];
  status: TaskStatus;
}

export interface FiltersDTO {
  limit: number;
  page: number;
  status: TaskStatus;
}

export enum TaskStatus {
  TODO = "To Do",
  INPROGRESS = "In progress",
  DONE = "Done",
}

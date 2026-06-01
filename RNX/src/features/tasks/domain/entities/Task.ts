export type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

export type TaskInput = Omit<Task, 'id'>;
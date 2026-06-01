import type { Task, TaskInput } from '../entities/Task';

export interface TaskRepository {
  getTasks(): Promise<Task[]>;
  createTask(task: TaskInput): Promise<Task>;
  updateTask(task: Task): Promise<Task>;
  deleteTask(id: number): Promise<void>;
}
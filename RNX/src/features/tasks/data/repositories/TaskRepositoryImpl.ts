import type { Task, TaskInput } from '../../domain/entities/Task';
import type { TaskRepository } from '../../domain/repositories/TaskRepository';
import { TaskRemoteService } from '../services/TaskRemoteService';

export class TaskRepositoryImpl implements TaskRepository {
  private tasks: Task[] = [];
  private loaded = false;

  constructor(private readonly remoteService: TaskRemoteService) {}

  async getTasks(): Promise<Task[]> {
    if (!this.loaded) {
      const initialTasks = await this.remoteService.fetchTasks();

      this.tasks = initialTasks.map((task, index) =>
        this.remoteService.toEntity(task, index + 1),
      );
      this.loaded = true;
    }

    return [...this.tasks];
  }

  async createTask(task: TaskInput): Promise<Task> {
    const createdTask: Task = {
      id: this.nextId(),
      ...task,
    };

    this.tasks = [createdTask, ...this.tasks];

    return createdTask;
  }

  async updateTask(task: Task): Promise<Task> {
    const index = this.tasks.findIndex((currentTask) => currentTask.id === task.id);

    if (index === -1) {
      throw new Error('Task not found.');
    }

    this.tasks = this.tasks.map((currentTask) =>
      currentTask.id === task.id ? task : currentTask,
    );

    return task;
  }

  async deleteTask(id: number): Promise<void> {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  private nextId(): number {
    return this.tasks.length === 0
      ? 1
      : Math.max(...this.tasks.map((task) => task.id)) + 1;
  }
}
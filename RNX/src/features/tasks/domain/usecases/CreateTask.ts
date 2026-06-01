import type { Task, TaskInput } from '../entities/Task';
import type { TaskRepository } from '../repositories/TaskRepository';

export class CreateTaskUseCase {
  constructor(private readonly repository: TaskRepository) {}

  execute(task: TaskInput): Promise<Task> {
    return this.repository.createTask(task);
  }
}
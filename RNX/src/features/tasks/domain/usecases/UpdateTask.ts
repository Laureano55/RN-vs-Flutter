import type { Task } from '../entities/Task';
import type { TaskRepository } from '../repositories/TaskRepository';

export class UpdateTaskUseCase {
  constructor(private readonly repository: TaskRepository) {}

  execute(task: Task): Promise<Task> {
    return this.repository.updateTask(task);
  }
}
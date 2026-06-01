import type { Task } from '../entities/Task';
import type { TaskRepository } from '../repositories/TaskRepository';

export class GetTasksUseCase {
  constructor(private readonly repository: TaskRepository) {}

  execute(): Promise<Task[]> {
    return this.repository.getTasks();
  }
}
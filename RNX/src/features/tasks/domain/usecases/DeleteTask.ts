import type { TaskRepository } from '../repositories/TaskRepository';

export class DeleteTaskUseCase {
  constructor(private readonly repository: TaskRepository) {}

  execute(id: number): Promise<void> {
    return this.repository.deleteTask(id);
  }
}
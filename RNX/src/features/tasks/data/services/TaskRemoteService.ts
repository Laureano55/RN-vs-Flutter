import { fetchTasksFromApi } from '../../../../core/api/taskApi';
import type { Task, TaskInput } from '../../domain/entities/Task';

export class TaskRemoteService {
  async fetchTasks(): Promise<TaskInput[]> {
    const tasks = await fetchTasksFromApi();

    return tasks.map((task) => ({
      title: task.title,
      description: '',
      completed: task.completed,
    }));
  }

  toEntity(task: TaskInput, id: number): Task {
    return {
      id,
      title: task.title,
      description: task.description,
      completed: task.completed,
    };
  }
}
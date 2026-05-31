import '../entities/task.dart';
import '../repositories/task_repository.dart';

class CreateTaskUseCase {
  CreateTaskUseCase(this._repository);

  final TaskRepository _repository;

  Future<Task> call({
    required String title,
    required String description,
    required bool completed,
  }) {
    return _repository.createTask(
      Task(
        id: 0,
        title: title,
        description: description,
        completed: completed,
      ),
    );
  }
}
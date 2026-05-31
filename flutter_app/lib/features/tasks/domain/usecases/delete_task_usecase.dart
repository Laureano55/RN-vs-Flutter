import '../repositories/task_repository.dart';

class DeleteTaskUseCase {
  DeleteTaskUseCase(this._repository);

  final TaskRepository _repository;

  Future<void> call(int id) {
    return _repository.deleteTask(id);
  }
}
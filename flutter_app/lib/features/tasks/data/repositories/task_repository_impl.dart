import '../../domain/entities/task.dart';
import '../../domain/repositories/task_repository.dart';
import '../datasources/task_remote_datasource.dart';

class TaskRepositoryImpl implements TaskRepository {
  TaskRepositoryImpl({required TaskRemoteDataSource remoteDataSource})
      : _remoteDataSource = remoteDataSource;

  final TaskRemoteDataSource _remoteDataSource;

  List<Task> _tasks = [];
  bool _isLoaded = false;

  @override
  Future<List<Task>> getTasks() async {
    if (!_isLoaded) {
      final remoteTasks = await _remoteDataSource.fetchTasks();
      _tasks = remoteTasks.map((model) => model.toEntity()).toList();
      _isLoaded = true;
    }

    return List.unmodifiable(_tasks);
  }

  @override
  Future<Task> createTask(Task task) async {
    final createdTask = task.copyWith(id: _nextId());
    _tasks = [createdTask, ..._tasks];
    return createdTask;
  }

  @override
  Future<Task> updateTask(Task task) async {
    final index = _tasks.indexWhere((item) => item.id == task.id);

    if (index == -1) {
      throw StateError('Task not found.');
    }

    _tasks = List<Task>.from(_tasks);
    _tasks[index] = task;
    return task;
  }

  @override
  Future<void> deleteTask(int id) async {
    _tasks = _tasks.where((task) => task.id != id).toList();
  }

  int _nextId() {
    if (_tasks.isEmpty) {
      return 1;
    }

    final highestId = _tasks
        .map((task) => task.id)
        .reduce((current, next) => next > current ? next : current);

    return highestId + 1;
  }
}
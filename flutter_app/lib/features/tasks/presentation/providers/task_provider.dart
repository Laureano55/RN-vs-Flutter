import 'package:flutter/foundation.dart';

import '../../domain/entities/task.dart';
import '../../domain/usecases/create_task_usecase.dart';
import '../../domain/usecases/delete_task_usecase.dart';
import '../../domain/usecases/get_tasks_usecase.dart';
import '../../domain/usecases/update_task_usecase.dart';

class TaskProvider extends ChangeNotifier {
  TaskProvider({
    required GetTasksUseCase getTasksUseCase,
    required CreateTaskUseCase createTaskUseCase,
    required UpdateTaskUseCase updateTaskUseCase,
    required DeleteTaskUseCase deleteTaskUseCase,
  })  : _getTasksUseCase = getTasksUseCase,
        _createTaskUseCase = createTaskUseCase,
        _updateTaskUseCase = updateTaskUseCase,
        _deleteTaskUseCase = deleteTaskUseCase;

  final GetTasksUseCase _getTasksUseCase;
  final CreateTaskUseCase _createTaskUseCase;
  final UpdateTaskUseCase _updateTaskUseCase;
  final DeleteTaskUseCase _deleteTaskUseCase;

  List<Task> _tasks = [];
  bool _isLoading = false;
  bool _isSaving = false;
  String? _errorMessage;

  List<Task> get tasks => List.unmodifiable(_tasks);
  bool get isLoading => _isLoading;
  bool get isSaving => _isSaving;
  String? get errorMessage => _errorMessage;

  Future<void> loadTasks() async {
    if (_isLoading || _tasks.isNotEmpty) {
      return;
    }

    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      _tasks = await _getTasksUseCase();
    } catch (_) {
      _errorMessage = 'No se pudieron cargar las tareas.';
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Task? taskById(int id) {
    try {
      return _tasks.firstWhere((task) => task.id == id);
    } catch (_) {
      return null;
    }
  }

  Future<Task> saveTask({
    int? id,
    required String title,
    required String description,
    required bool completed,
  }) async {
    _isSaving = true;
    notifyListeners();

    try {
      final task = Task(
        id: id ?? 0,
        title: title,
        description: description,
        completed: completed,
      );

      if (id == null) {
        final createdTask = await _createTaskUseCase(
          title: title,
          description: description,
          completed: completed,
        );
        _tasks = [createdTask, ..._tasks];
        return createdTask;
      }

      final updatedTask = await _updateTaskUseCase(task);
      _tasks = _tasks
          .map((currentTask) => currentTask.id == updatedTask.id ? updatedTask : currentTask)
          .toList();
      return updatedTask;
    } finally {
      _isSaving = false;
      notifyListeners();
    }
  }

  Future<void> deleteTask(int id) async {
    await _deleteTaskUseCase(id);
    _tasks = _tasks.where((task) => task.id != id).toList();
    notifyListeners();
  }
}
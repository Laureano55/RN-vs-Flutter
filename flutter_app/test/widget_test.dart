import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:flutter_app/main.dart';
import 'package:flutter_app/features/tasks/domain/entities/task.dart';
import 'package:flutter_app/features/tasks/domain/repositories/task_repository.dart';

class FakeTaskRepository implements TaskRepository {
  FakeTaskRepository()
      : _tasks = [
          const Task(
            id: 1,
            title: 'Comprar leche',
            description: 'Ir al supermercado',
            completed: false,
          ),
          const Task(
            id: 2,
            title: 'Leer documentación',
            description: 'Revisar el proyecto',
            completed: true,
          ),
        ];

  List<Task> _tasks;

  @override
  Future<Task> createTask(Task task) async {
    final createdTask = task.copyWith(id: _tasks.length + 1);
    _tasks = [createdTask, ..._tasks];
    return createdTask;
  }

  @override
  Future<void> deleteTask(int id) async {
    _tasks = _tasks.where((task) => task.id != id).toList();
  }

  @override
  Future<List<Task>> getTasks() async {
    return List.unmodifiable(_tasks);
  }

  @override
  Future<Task> updateTask(Task task) async {
    _tasks = _tasks
        .map((currentTask) => currentTask.id == task.id ? task : currentTask)
        .toList();
    return task;
  }
}

void main() {
  testWidgets('Loads tasks and opens the detail screen', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(
      TaskApp(repository: FakeTaskRepository()),
    );

    await tester.pumpAndSettle();

    expect(find.text('Task Manager'), findsOneWidget);
    expect(find.text('Comprar leche'), findsOneWidget);
    expect(find.text('Pendiente'), findsOneWidget);

    await tester.tap(find.text('Comprar leche'));
    await tester.pumpAndSettle();

    expect(find.text('Detalle'), findsOneWidget);
    expect(find.text('ID: 1'), findsOneWidget);

    await tester.tap(find.byIcon(Icons.edit));
    await tester.pumpAndSettle();

    expect(find.text('Editar tarea'), findsOneWidget);
    expect(find.text('Actualizar'), findsOneWidget);
  });
}

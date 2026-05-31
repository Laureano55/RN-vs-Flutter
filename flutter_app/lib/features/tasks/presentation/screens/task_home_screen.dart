import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../domain/entities/task.dart';
import '../components/task_list_item.dart';
import '../providers/task_provider.dart';
import 'task_detail_screen.dart';
import 'task_form_screen.dart';

class TaskHomeScreen extends StatelessWidget {
  const TaskHomeScreen({super.key});

  Future<void> _confirmDelete(BuildContext context, Task task) async {
    final shouldDelete = await showDialog<bool>(
      context: context,
      builder: (dialogContext) {
        return AlertDialog(
          title: const Text('Eliminar tarea'),
          content: Text('¿Quieres eliminar "${task.title}"?'),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(dialogContext).pop(false),
              child: const Text('Cancelar'),
            ),
            FilledButton(
              onPressed: () => Navigator.of(dialogContext).pop(true),
              child: const Text('Eliminar'),
            ),
          ],
        );
      },
    );

    if (shouldDelete == true && context.mounted) {
      await context.read<TaskProvider>().deleteTask(task.id);
    }
  }

  @override
  Widget build(BuildContext context) {
    final taskProvider = context.watch<TaskProvider>();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Task Manager'),
      ),
      body: _buildBody(context, taskProvider),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.of(context).push(
            MaterialPageRoute<void>(
              builder: (_) => const TaskFormScreen(),
            ),
          );
        },
        child: const Icon(Icons.add),
      ),
    );
  }

  Widget _buildBody(BuildContext context, TaskProvider taskProvider) {
    if (taskProvider.isLoading) {
      return const Center(child: CircularProgressIndicator());
    }

    if (taskProvider.errorMessage != null) {
      return Center(child: Text(taskProvider.errorMessage!));
    }

    if (taskProvider.tasks.isEmpty) {
      return const Center(child: Text('No hay tareas disponibles.'));
    }

    return ListView.separated(
      padding: const EdgeInsets.all(16),
      itemCount: taskProvider.tasks.length,
      separatorBuilder: (_, _) => const SizedBox(height: 8),
      itemBuilder: (context, index) {
        final task = taskProvider.tasks[index];

        return TaskListItem(
          task: task,
          onTap: () {
            Navigator.of(context).push(
              MaterialPageRoute<void>(
                builder: (_) => TaskDetailScreen(taskId: task.id),
              ),
            );
          },
          onDelete: () => _confirmDelete(context, task),
        );
      },
    );
  }
}
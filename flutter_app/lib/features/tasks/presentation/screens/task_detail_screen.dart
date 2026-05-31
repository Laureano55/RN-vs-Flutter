import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../domain/entities/task.dart';
import '../providers/task_provider.dart';
import 'task_form_screen.dart';

class TaskDetailScreen extends StatelessWidget {
  const TaskDetailScreen({super.key, required this.taskId});

  final int taskId;

  @override
  Widget build(BuildContext context) {
    final Task? task = context.watch<TaskProvider>().taskById(taskId);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Detalle'),
        actions: [
          if (task != null)
            IconButton(
              onPressed: () {
                Navigator.of(context).push(
                  MaterialPageRoute<void>(
                    builder: (_) => TaskFormScreen(task: task),
                  ),
                );
              },
              icon: const Icon(Icons.edit),
            ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(24),
        child: task == null
            ? const Center(child: Text('La tarea no existe.'))
            : Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('ID: ${task.id}'),
                  const SizedBox(height: 12),
                  Text(
                    task.title,
                    style: Theme.of(context).textTheme.headlineSmall,
                  ),
                  const SizedBox(height: 16),
                  Text(
                    task.description.isEmpty ? 'Sin descripción' : task.description,
                  ),
                  const SizedBox(height: 16),
                  Text('Estado: ${task.completed ? 'Completada' : 'Pendiente'}'),
                ],
              ),
      ),
    );
  }
}
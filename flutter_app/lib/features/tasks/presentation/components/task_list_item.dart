import 'package:flutter/material.dart';

import '../../domain/entities/task.dart';

class TaskListItem extends StatelessWidget {
  const TaskListItem({
    super.key,
    required this.task,
    required this.onTap,
    required this.onDelete,
  });

  final Task task;
  final VoidCallback onTap;
  final VoidCallback onDelete;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        onTap: onTap,
        title: Text(
          task.title,
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
        ),
        subtitle: Text(task.completed ? 'Completada' : 'Pendiente'),
        trailing: IconButton(
          onPressed: onDelete,
          icon: const Icon(Icons.delete_outline),
        ),
      ),
    );
  }
}
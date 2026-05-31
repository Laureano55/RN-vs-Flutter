import '../../domain/entities/task.dart';

class TaskModel {
  const TaskModel({
    required this.id,
    required this.title,
    required this.completed,
  });

  factory TaskModel.fromJson(Map<String, dynamic> json) {
    return TaskModel(
      id: json['id'] as int,
      title: json['title']?.toString() ?? '',
      completed: json['completed'] as bool? ?? false,
    );
  }

  final int id;
  final String title;
  final bool completed;

  Task toEntity() {
    return Task(
      id: id,
      title: title,
      description: '',
      completed: completed,
    );
  }
}
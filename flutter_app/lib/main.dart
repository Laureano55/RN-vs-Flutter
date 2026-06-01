import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';

import 'features/tasks/data/datasources/task_remote_datasource.dart';
import 'features/tasks/data/repositories/task_repository_impl.dart';
import 'features/tasks/domain/repositories/task_repository.dart';
import 'features/tasks/domain/usecases/create_task_usecase.dart';
import 'features/tasks/domain/usecases/delete_task_usecase.dart';
import 'features/tasks/domain/usecases/get_tasks_usecase.dart';
import 'features/tasks/domain/usecases/update_task_usecase.dart';
import 'features/tasks/presentation/providers/task_provider.dart';
import 'features/tasks/presentation/screens/task_home_screen.dart';

void main() {
  final httpClient = http.Client();
  final repository = TaskRepositoryImpl(
    remoteDataSource: TaskRemoteDataSource(client: httpClient),
  );

  runApp(TaskApp(repository: repository));
}

class TaskApp extends StatelessWidget {
  const TaskApp({super.key, required this.repository});

  final TaskRepository repository;

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider<TaskProvider>(
          create: (_) => TaskProvider(
            getTasksUseCase: GetTasksUseCase(repository),
            createTaskUseCase: CreateTaskUseCase(repository),
            updateTaskUseCase: UpdateTaskUseCase(repository),
            deleteTaskUseCase: DeleteTaskUseCase(repository),
          )..loadTasks(),
        ),
      ],
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        showPerformanceOverlay: false,
        title: 'Task Manager',
        theme: ThemeData(useMaterial3: true),
        home: const TaskHomeScreen(),
      ),
    );
  }
}

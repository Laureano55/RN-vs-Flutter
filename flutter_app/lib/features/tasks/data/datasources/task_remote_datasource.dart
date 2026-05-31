import 'dart:convert';

import 'package:http/http.dart' as http;

import '../../../../core/constants/app_constants.dart';
import '../models/task_model.dart';

class TaskRemoteDataSource {
  TaskRemoteDataSource({required this.client});

  final http.Client client;

  Future<List<TaskModel>> fetchTasks() async {
    final response = await client.get(Uri.parse(AppConstants.tasksApiUrl));

    if (response.statusCode != 200) {
      throw Exception('No se pudieron cargar las tareas.');
    }

    final decoded = jsonDecode(response.body);

    if (decoded is! List) {
      throw Exception('Respuesta inválida del servidor.');
    }

    return decoded
        .map((dynamic item) => TaskModel.fromJson(item as Map<String, dynamic>))
        .toList();
  }
}
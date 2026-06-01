export type TaskApiItem = {
  id: number;
  title: string;
  completed: boolean;
};

export async function fetchTasksFromApi(): Promise<TaskApiItem[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');

  if (!response.ok) {
    throw new Error('No se pudieron cargar las tareas.');
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error('Respuesta inválida del servidor.');
  }

  return data.map((item) => {
    const task = item as TaskApiItem;

    return {
      id: task.id,
      title: String(task.title ?? ''),
      completed: Boolean(task.completed),
    };
  });
}
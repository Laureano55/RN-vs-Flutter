import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';

import { TaskRepositoryImpl } from '../../data/repositories/TaskRepositoryImpl';
import { TaskRemoteService } from '../../data/services/TaskRemoteService';
import type { Task, TaskInput } from '../../domain/entities/Task';
import { CreateTaskUseCase } from '../../domain/usecases/CreateTask';
import { DeleteTaskUseCase } from '../../domain/usecases/DeleteTask';
import { GetTasksUseCase } from '../../domain/usecases/GetTasks';
import { UpdateTaskUseCase } from '../../domain/usecases/UpdateTask';

type TaskContextValue = {
  tasks: Task[];
  loading: boolean;
  saving: boolean;
  error: string | null;
  loadTasks: () => Promise<void>;
  createTask: (task: TaskInput) => Promise<Task>;
  updateTask: (task: Task) => Promise<Task>;
  deleteTask: (id: number) => Promise<void>;
  getTaskById: (id: number) => Task | undefined;
};

const TaskContext = createContext<TaskContextValue | undefined>(undefined);

const remoteService = new TaskRemoteService();
const repository = new TaskRepositoryImpl(remoteService);
const getTasksUseCase = new GetTasksUseCase(repository);
const createTaskUseCase = new CreateTaskUseCase(repository);
const updateTaskUseCase = new UpdateTaskUseCase(repository);
const deleteTaskUseCase = new DeleteTaskUseCase(repository);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadTasks() {
    if (loading || tasks.length > 0) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const initialTasks = await getTasksUseCase.execute();
      setTasks(initialTasks);
    } catch {
      setError('No se pudieron cargar las tareas.');
    } finally {
      setLoading(false);
    }
  }

  async function createTask(task: TaskInput) {
    setSaving(true);

    try {
      const createdTask = await createTaskUseCase.execute(task);
      setTasks((currentTasks) => [createdTask, ...currentTasks]);
      return createdTask;
    } finally {
      setSaving(false);
    }
  }

  async function updateTask(task: Task) {
    setSaving(true);

    try {
      const updatedTask = await updateTaskUseCase.execute(task);
      setTasks((currentTasks) =>
        currentTasks.map((currentTask) =>
          currentTask.id === updatedTask.id ? updatedTask : currentTask,
        ),
      );
      return updatedTask;
    } finally {
      setSaving(false);
    }
  }

  async function deleteTask(id: number) {
    await deleteTaskUseCase.execute(id);
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  }

  function getTaskById(id: number) {
    return tasks.find((task) => task.id === id);
  }

  useEffect(() => {
    void loadTasks();
    // Se carga una sola vez al montar el provider.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        saving,
        error,
        loadTasks,
        createTask,
        updateTask,
        deleteTask,
        getTaskById,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error('useTasks must be used within TaskProvider');
  }

  return context;
}
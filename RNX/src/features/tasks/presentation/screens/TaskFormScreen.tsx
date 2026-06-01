import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Button,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { Task } from '../../domain/entities/Task';
import { useTasks } from '../context/TaskContext';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Form'>;

export function TaskFormScreen({ navigation, route }: Props) {
  const { getTaskById, createTask, updateTask, saving } = useTasks();
  const taskId = route.params?.taskId;
  const existingTask = taskId ? getTaskById(taskId) : undefined;

  const [title, setTitle] = useState(existingTask?.title ?? '');
  const [description, setDescription] = useState(existingTask?.description ?? '');
  const [completed, setCompleted] = useState(existingTask?.completed ?? false);

  async function handleSave() {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    if (existingTask) {
      const updatedTask: Task = {
        ...existingTask,
        title: trimmedTitle,
        description: description.trim(),
        completed,
      };

      await updateTask(updatedTask);
    } else {
      await createTask({
        title: trimmedTitle,
        description: description.trim(),
        completed,
      });
    }

    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text>Title</Text>
        <TextInput value={title} onChangeText={setTitle} placeholder="Título de la tarea" />

        <Text>Description</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Descripción"
          multiline
        />

        <View style={styles.switchRow}>
          <Text>Completed</Text>
          <Switch value={completed} onValueChange={setCompleted} />
        </View>

        <Button
          title={existingTask ? 'Actualizar' : 'Crear'}
          onPress={() => void handleSave()}
          disabled={saving}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 16,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
});
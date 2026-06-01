import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useTasks } from '../context/TaskContext';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export function TaskDetailScreen({ navigation, route }: Props) {
  const { getTaskById } = useTasks();
  const task = getTaskById(route.params.taskId);

  if (!task) {
    return (
      <View style={styles.center}>
        <Text>La tarea no existe.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>ID: {task.id}</Text>
      <Text>Title: {task.title}</Text>
      <Text>Description: {task.description || 'Sin descripción'}</Text>
      <Text>Completed: {task.completed ? 'Completada' : 'Pendiente'}</Text>
      <Button title="Editar" onPress={() => navigation.navigate('Form', { taskId: task.id })} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
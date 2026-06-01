import { Button, StyleSheet, Text, View } from 'react-native';

import type { Task } from '../../domain/entities/Task';

type TaskListItemProps = {
  task: Task;
  onPress: () => void;
  onDelete: () => void;
};

export function TaskListItem({ task, onPress, onDelete }: TaskListItemProps) {
  return (
    <View style={styles.row}>
      <View style={styles.content}>
        <Button title={task.title} onPress={onPress} />
        <Text style={styles.status}>{task.completed ? 'Completada' : 'Pendiente'}</Text>
      </View>
      <Button title="Eliminar" onPress={onDelete} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  content: {
    flex: 1,
  },
  status: {
    marginTop: 4,
  },
});
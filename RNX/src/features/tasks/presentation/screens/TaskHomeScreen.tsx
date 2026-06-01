import { useEffect } from 'react';
import { Alert, Button, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { TaskListItem } from '../components/TaskListItem';
import { useTasks } from '../context/TaskContext';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function TaskHomeScreen({ navigation }: Props) {
  const {
    tasks,
    loading,
    error,
    deleteTask,
    loadTasks,
    logLoadDurationAfterRender,
  } = useTasks();

  useEffect(() => {
    if (!loading && tasks.length > 0) {
      const timer = setTimeout(() => {
        logLoadDurationAfterRender();
      }, 0);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [loading, tasks.length, logLoadDurationAfterRender]);

  return (
    <View style={styles.screen}>
      {loading ? (
        <View style={styles.center}>
          <Text>Cargando tareas...</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text>{error}</Text>
          <Button title="Reintentar" onPress={() => void loadTasks()} />
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={tasks.length === 0 ? styles.emptyContent : styles.list}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          ListEmptyComponent={<Text>No hay tareas disponibles.</Text>}
          renderItem={({ item }) => (
            <TaskListItem
              task={item}
              onPress={() => navigation.navigate('Detail', { taskId: item.id })}
              onDelete={() => {
                Alert.alert('Eliminar tarea', `¿Quieres eliminar "${item.title}"?`, [
                  { text: 'Cancelar', style: 'cancel' },
                  {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: () => {
                      void deleteTask(item.id);
                    },
                  },
                ]);
              }}
            />
          )}
        />
      )}

      <View style={styles.createButton}>
        <Button title="Crear tarea" onPress={() => navigation.navigate('Form')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
  },
  list: {
    paddingBottom: 16,
  },
  emptyContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButton: {
    marginTop: 12,
  },
});
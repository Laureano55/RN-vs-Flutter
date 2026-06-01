import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { TaskProvider } from './src/features/tasks/presentation/context/TaskContext';
import { TaskDetailScreen } from './src/features/tasks/presentation/screens/TaskDetailScreen';
import { TaskFormScreen } from './src/features/tasks/presentation/screens/TaskFormScreen';
import { TaskHomeScreen } from './src/features/tasks/presentation/screens/TaskHomeScreen';
import type { RootStackParamList } from './src/features/tasks/presentation/navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <TaskProvider>
        <NavigationContainer>
          <StatusBar style="dark" />
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShadowVisible: false,
            }}
          >
            <Stack.Screen
              name="Home"
              component={TaskHomeScreen}
              options={{ title: 'Task Manager' }}
            />
            <Stack.Screen
              name="Detail"
              component={TaskDetailScreen}
              options={{ title: 'Detalle' }}
            />
            <Stack.Screen
              name="Form"
              component={TaskFormScreen}
              options={{ title: 'Formulario' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TaskProvider>
    </SafeAreaProvider>
  );
}

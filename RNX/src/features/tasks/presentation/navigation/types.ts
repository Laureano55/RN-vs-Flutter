export type RootStackParamList = {
  Home: undefined;
  Detail: { taskId: number };
  Form: { taskId?: number } | undefined;
};
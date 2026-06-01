# RNX Task Manager

Fresh Expo app created from scratch to compare with the Flutter version in this repo.

## What it does

- Loads tasks once from `https://jsonplaceholder.typicode.com/todos`
- Shows list, detail, create, edit, and delete flows
- Keeps CRUD only in memory
- Uses Context API and a simplified Clean Architecture
- Uses React Navigation instead of expo-router

## Run it

```bash
cd "c:\Users\User\Documents\movil\RN-vs-Flutter\RNX"
npx expo start -c
```

## Structure

- `App.tsx` is the root entrypoint
- `src/core/api` contains the API fetch function
- `src/features/tasks/domain` contains entities, repositories, and use cases
- `src/features/tasks/data` contains the remote service and in-memory repository
- `src/features/tasks/presentation` contains the context, screens, components, and navigation types
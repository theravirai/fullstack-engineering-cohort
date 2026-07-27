import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../features/todos/todoSlice';

// 1. Function to load the state from LocalStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('redux-hackathon-todos');
    if (serializedState === null) {
      return undefined; // Let reducers initialize with their default state
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// 2. Function to save the state to LocalStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('redux-hackathon-todos', serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  preloadedState: loadState(), // Load initial state when app starts
});

// 3. Subscribe to the store to save state whenever it changes
store.subscribe(() => {
  saveState({
    todos: store.getState().todos,
  });
});

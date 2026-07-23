import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      // action.payload is the text of the new todo
      const todo = {
        id: nanoid(), // RTK provides nanoid to generate unique IDs
        text: action.payload,
        completed: false,
      };
      state.todos.push(todo);
    },
    deleteTodo: (state, action) => {
      // action.payload is the id of the todo to delete
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      // action.payload is an object containing { id, text }
      const { id, text } = action.payload;
      const existingTodo = state.todos.find((todo) => todo.id === id);
      if (existingTodo) {
        existingTodo.text = text;
      }
    },
    toggleTodoStatus: (state, action) => {
      // action.payload is the id of the todo to toggle
      const existingTodo = state.todos.find((todo) => todo.id === action.payload);
      if (existingTodo) {
        existingTodo.completed = !existingTodo.completed;
      }
    },
  },
});

export const { addTodo, deleteTodo, updateTodo, toggleTodoStatus } = todoSlice.actions;

export default todoSlice.reducer;

# Important Functions in Redux Toolkit

Here are the most common functions you will use in RTK.

### configureStore
This replaces the old `createStore` function. It automatically combines your slice reducers, adds middleware (like Redux Thunk for async logic), and sets up the Redux DevTools.
```javascript
import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '../features/todos/todoSlice'

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
})
```

### createSlice
This is the workhorse of RTK. It accepts an initial state, an object of reducer functions, and a "slice name". It automatically generates action creators and action types that match the reducers.
```javascript
import { createSlice } from '@reduxjs/toolkit'

export const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload)
    }
  }
})

export const { addTodo } = todoSlice.actions
export default todoSlice.reducer
```

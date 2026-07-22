# Recommended Folder Structure

When building a React app with Redux Toolkit, it helps to organize files by feature rather than by type. This keeps related logic together.

Here is a common structure:

```text
src/
  app/
    store.js          # The Redux store setup
  features/
    todos/
      todoSlice.js    # The slice (reducers & actions) for todos
      TodoList.jsx    # React component that lists todos
      TodoForm.jsx    # React component to add a todo
  main.jsx            # Entry point where we provide the store
```

### Why this structure?
- `app/` contains the central configuration. 
- `features/` groups code by what it does. Instead of having one folder for all actions, one for all reducers, and one for all components, you put the `todoSlice` right next to the `TodoList` component. This makes it easier to find and update related code.

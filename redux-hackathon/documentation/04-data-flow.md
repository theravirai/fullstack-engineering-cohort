# Data Flow in Redux Toolkit

Redux follows a strict "unidirectional data flow". This means data always moves in one direction, making state changes easy to track.

Here is how the flow works in a React application:

1. **Initial Setup:** The store is created using a root reducer. The UI renders based on the initial state of the store.
2. **User Interaction:** A user does something in the app, like clicking an "Add Todo" button.
3. **Dispatch:** The component calls `dispatch(addTodo(newTodoText))`.
4. **Reducer:** The Redux store runs the reducer function for `addTodo`. It calculates the new state based on the current state and the action's payload.
5. **State Update:** The store saves this new state.
6. **UI Update:** The store notifies all parts of the UI that are subscribed to it (using `useSelector`). The components see the data has changed and re-render with the new information.

Because the data only flows one way, it is much easier to debug when something goes wrong. We can look at the action that was dispatched and see exactly how the reducer changed the state.

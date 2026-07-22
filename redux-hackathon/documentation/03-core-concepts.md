# Core Concepts

To use Redux Toolkit effectively, we need to understand a few main concepts.

## The Store
The store is the global state container for our application. It holds the whole state tree of our app. The only way to change the state inside it is to dispatch an action.

## Slices
A slice is a collection of Redux reducer logic and actions for a single feature in your app. For example, a `todoSlice` handles all state updates related to todos, while a `userSlice` handles login state. Redux Toolkit's `createSlice` function automatically generates action creators and action types that correspond to the reducers we define.

## Reducers
A reducer is a function that takes the current state and an action, decides how to update the state based on that action, and returns the new state. It is basically an event listener that handles events based on the action type it receives.

## Actions
An action is just a plain JavaScript object that has a `type` field. It describes something that happened in the application. We can also attach additional information to the action using a `payload` field (like the text for a new todo item).

## useSelector
This is a React hook provided by `react-redux`. It lets our React components read data from the Redux store. When the state updates, `useSelector` forces the component to re-render so it shows the latest data.

## useDispatch
This is another React hook. It gives us the store's `dispatch` method, which we use to send actions to the store to trigger state updates.

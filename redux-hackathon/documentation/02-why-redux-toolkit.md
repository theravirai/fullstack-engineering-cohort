# Why use Redux Toolkit?

Redux has always been a solid tool for managing global state in React applications, but it came with some known problems that RTK fixes.

## Problems with plain Redux
1. **Configuring a store was complicated.** You had to combine reducers, add middleware, and set up the DevTools extension manually.
2. **Too many packages.** You often needed to install `redux`, `react-redux`, `redux-thunk`, and sometimes others just to get a basic app working.
3. **Too much boilerplate.** Writing actions and reducers required a lot of repetitive code. State updates also had to be strictly immutable, which meant using spread operators (`...state`) everywhere and making deep copies of nested objects.

## How RTK solves them
- `configureStore` sets up the store with good defaults, including Redux Thunk and the Redux DevTools extension.
- It includes all the necessary dependencies out of the box.
- It uses a library called Immer under the hood. This lets us write code that looks like it mutates state directly (e.g., `state.value = 1`), but Immer safely translates it into immutable updates.

This makes the code much easier to read and maintain.

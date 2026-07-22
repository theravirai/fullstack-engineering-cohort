# My Notes

*This document contains personal notes and observations made while learning Redux Toolkit.*

- The biggest shift in thinking was getting used to `createSlice`. Instead of writing separate action files and reducer files, everything lives in one place.
- Immer is amazing. Being able to write `state.push()` instead of `return [...state, newItem]` saves a lot of typing and prevents accidental mutations.
- The React hooks (`useSelector` and `useDispatch`) make connecting components to the store much easier than the old `connect()` higher-order component approach.
- I need to remember that Redux state is gone if the user refreshes the page. If I want data to persist, I have to save it to LocalStorage or a database.

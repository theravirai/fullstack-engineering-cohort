# Challenges Faced

*Documenting the hurdles I ran into while building the project.*

1. **Understanding the payload:** At first, I was confused about how data was passed from the component to the reducer. I realized that whatever I pass into the action creator (e.g., `addTodo("Buy milk")`) becomes `action.payload` in the reducer.
2. **Immutability vs Mutation:** Even though Immer allows us to write "mutating" code, we cannot mix the two approaches in a single reducer. We either mutate the state directly OR return a new state object. Returning a mutated state causes errors.
3. **Folder Organization:** Deciding where to put files took some trial and error. Following the feature-folder approach made things much cleaner than splitting by file type.

# Real-World Use Cases for Redux

Redux is great for managing global state, but you do not need it for everything. Here are some examples of when it makes sense to use Redux in a real application:

1. **User Authentication:** Storing the logged-in user's profile, token, and permissions. You often need to access this data from many different components across the app (like the navbar, profile page, and protected routes).
2. **Shopping Cart:** In an e-commerce app, a user can add items to their cart from the product list, the product detail page, or a recommended items widget. The cart total needs to update in the site header globally.
3. **Caching Server Data:** Storing a list of products fetched from an API so you do not have to refetch them every time the user navigates between pages.
4. **Theme Preferences:** Storing the user's choice for light or dark mode so the entire app can react to the change immediately.

If data is only used by one component and its immediate children (like a form input or a dropdown toggle), it is better to just use React's `useState`.

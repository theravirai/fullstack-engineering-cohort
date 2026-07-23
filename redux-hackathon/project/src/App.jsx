import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="app-container">
      <main className="todo-app">
        <header className="app-header">
          <h1>My Tasks</h1>
          <p>Organize your day with Redux Toolkit</p>
        </header>
        <TodoForm />
        <TodoList />
      </main>
    </div>
  );
}

export default App;

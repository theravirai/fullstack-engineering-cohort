import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  return (
    <main className="app-container">
      <section className="todo-app" aria-labelledby="app-title">
        <header className="app-header">
          <h1 id="app-title">My Tasks</h1>
          <p>Stay organized and focused.</p>
        </header>
        <TodoForm />
        <TodoList />
      </section>
    </main>
  );
}

export default App;

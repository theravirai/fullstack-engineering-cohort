import { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <main className="app-container">
      <section className="todo-app" aria-labelledby="app-title">
        <header className="app-header">
          <div className="header-top">
            <h1 id="app-title">Task System</h1>
            <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
              {theme === 'dark' ? '☀️ LIGHT MODE' : '🌙 DARK MODE'}
            </button>
          </div>
          <p>Redux Toolkit Architecture</p>
        </header>

        <TodoForm />
        <TodoList />
      </section>
    </main>
  );
}

export default App;

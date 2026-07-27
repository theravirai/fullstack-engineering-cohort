import { useSelector, useDispatch } from 'react-redux';
import TodoItem from './TodoItem';
import { setFilter, clearCompleted } from '../features/todos/todoSlice';

const TodoList = () => {
  const dispatch = useDispatch();
  
  const { todos, filter } = useSelector((state) => state.todos);

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all'
  });

  const totalCount = todos.length;
  const completedCount = todos.filter(t => t.completed).length;
  const activeCount = totalCount - completedCount;

  return (
    <div className="todo-list-container">
      {/* Dashboard Divider Status Bar */}
      <div className="status-bar">
        <span>Tasks (<strong>{totalCount}</strong>)</span>
        <span>Completed: <strong>{completedCount}</strong></span>
        <span>Remaining: <strong>{activeCount}</strong></span>
      </div>

      {todos.length === 0 ? (
        <div className="empty-state">
          <p>No tasks yet.</p>
          <p className="empty-subtitle">Add your first task above.</p>
        </div>
      ) : (
        <ul className="todo-list">
          {filteredTodos.length === 0 ? (
            <div className="empty-state">
              <p>No {filter} tasks found.</p>
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))
          )}
        </ul>
      )}

      {/* Footer Dashboard Divider */}
      {todos.length > 0 && (
        <div className="todo-footer">
          <div className="filter-section">
            <div className="filter-label">Filter:</div>
            <div className="todo-filters">
              <button 
                className={filter === 'all' ? 'active-filter' : ''} 
                onClick={() => dispatch(setFilter('all'))}
              >
                All
              </button>
              <button 
                className={filter === 'active' ? 'active-filter' : ''} 
                onClick={() => dispatch(setFilter('active'))}
              >
                Active
              </button>
              <button 
                className={filter === 'completed' ? 'active-filter' : ''} 
                onClick={() => dispatch(setFilter('completed'))}
              >
                Completed
              </button>
            </div>
          </div>

          <button 
            className="clear-completed" 
            onClick={() => dispatch(clearCompleted())}
            disabled={completedCount === 0}
          >
            [ Clear Completed ]
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoList;

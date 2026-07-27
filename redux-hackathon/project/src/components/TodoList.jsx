import { useSelector, useDispatch } from 'react-redux';
import TodoItem from './TodoItem';
import { setFilter, clearCompleted } from '../features/todos/todoSlice';

const TodoList = () => {
  const dispatch = useDispatch();
  
  // Read both todos and current filter from Redux
  const { todos, filter } = useSelector((state) => state.todos);

  // Derived state: calculate which todos to show based on the filter
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all'
  });

  const activeCount = todos.filter(t => !t.completed).length;

  return (
    <div className="todo-list-container">
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

      {/* Footer / Stats (Only show if there are any todos at all) */}
      {todos.length > 0 && (
        <div className="todo-footer">
          <span className="todo-count">
            <strong>{activeCount}</strong> {activeCount === 1 ? 'item' : 'items'} left
          </span>
          
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

          <button 
            className="clear-completed" 
            onClick={() => dispatch(clearCompleted())}
            disabled={todos.length - activeCount === 0}
          >
            Clear completed
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoList;

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
      {/* Dashboard Divider Status Bar (Hardware style) */}
      <div className="status-bar">
        <span className="status-item">TOTAL: {String(totalCount).padStart(2, '0')}</span>
        <span className="status-divider">//</span>
        <span className="status-item">COMPLETED: {String(completedCount).padStart(2, '0')}</span>
        <span className="status-divider">//</span>
        <span className="status-item">ACTIVE: {String(activeCount).padStart(2, '0')}</span>
      </div>

      {todos.length === 0 ? (
        <div className="empty-state">
          <p>SYSTEM EMPTY</p>
        </div>
      ) : (
        <ul className="todo-list">
          {filteredTodos.length === 0 ? (
            <div className="empty-state">
              <p>NO {filter.toUpperCase()} TASKS</p>
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))
          )}
        </ul>
      )}

      {/* Footer */}
      {todos.length > 0 && (
        <div className="todo-footer">
          <div className="todo-filters">
            <button 
              className={filter === 'all' ? 'active-filter' : ''} 
              onClick={() => dispatch(setFilter('all'))}
            >
              ALL
            </button>
            <button 
              className={filter === 'active' ? 'active-filter' : ''} 
              onClick={() => dispatch(setFilter('active'))}
            >
              ACTIVE
            </button>
            <button 
              className={filter === 'completed' ? 'active-filter' : ''} 
              onClick={() => dispatch(setFilter('completed'))}
            >
              COMPLETED
            </button>
          </div>

          <button 
            className="clear-completed" 
            onClick={() => dispatch(clearCompleted())}
            disabled={completedCount === 0}
          >
            CLEAR COMPLETED
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoList;

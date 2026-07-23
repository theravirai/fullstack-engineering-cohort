import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';

const TodoList = () => {
  // Read state from Redux
  const todos = useSelector((state) => state.todos.todos);

  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p>You have no tasks! 🎉</p>
        <p className="empty-subtitle">Add one above to get started.</p>
      </div>
    );
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;

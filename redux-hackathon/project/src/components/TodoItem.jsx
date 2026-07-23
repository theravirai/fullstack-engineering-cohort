import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo, toggleTodoStatus, updateTodo } from '../features/todos/todoSlice';

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleUpdate = () => {
    if (editText.trim() && editText !== todo.text) {
      dispatch(updateTodo({ id: todo.id, text: editText.trim() }));
    } else {
      setEditText(todo.text);
    }
    setIsEditing(false);
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          className="todo-checkbox"
          checked={todo.completed}
          onChange={() => dispatch(toggleTodoStatus(todo.id))}
        />
        
        {isEditing ? (
          <input
            type="text"
            className="todo-edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleUpdate}
            onKeyDown={(e) => e.key === 'Enter' && handleUpdate()}
            autoFocus
          />
        ) : (
          <span className="todo-text" onDoubleClick={() => setIsEditing(true)}>
            {todo.text}
          </span>
        )}
      </div>

      <div className="todo-actions">
        <button className="btn-icon edit-btn" onClick={() => setIsEditing(!isEditing)} title="Edit task">
          {isEditing ? '💾' : '✏️'}
        </button>
        <button 
          className="btn-icon delete-btn" 
          onClick={() => dispatch(deleteTodo(todo.id))}
          title="Delete task"
        >
          🗑️
        </button>
      </div>
    </li>
  );
};

export default TodoItem;

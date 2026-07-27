import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo, toggleTodoStatus, updateTodo } from '../features/todos/todoSlice';

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (editText.trim() && editText !== todo.text) {
      dispatch(updateTodo({ id: todo.id, text: editText.trim() }));
    } else {
      setEditText(todo.text);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text); // Restores the old value from Redux
    setIsEditing(false);
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        {!isEditing && (
          <input
            type="checkbox"
            className="todo-checkbox"
            checked={todo.completed}
            onChange={() => dispatch(toggleTodoStatus(todo.id))}
            aria-label={`Mark "${todo.text}" as ${todo.completed ? 'active' : 'completed'}`}
          />
        )}
        
        {isEditing ? (
          <>
            <label htmlFor={`edit-${todo.id}`} className="sr-only">Edit task</label>
            <input
              id={`edit-${todo.id}`}
              type="text"
              className="todo-edit-input"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
                if (e.key === 'Escape') handleCancel();
              }}
              autoFocus
            />
          </>
        ) : (
          <span className="todo-text" onDoubleClick={() => setIsEditing(true)}>
            {todo.text}
          </span>
        )}
      </div>

      <div className="todo-actions">
        {isEditing ? (
          <>
            <button className="btn-icon" onClick={handleSave} title="Save" aria-label="Save changes">
              💾
            </button>
            <button className="btn-icon" onClick={handleCancel} title="Cancel" aria-label="Cancel editing">
              ❌
            </button>
          </>
        ) : (
          <>
            <button className="btn-icon edit-btn" onClick={() => setIsEditing(true)} title="Edit task" aria-label={`Edit task: ${todo.text}`}>
              ✏️
            </button>
            <button 
              className="btn-icon delete-btn" 
              onClick={() => dispatch(deleteTodo(todo.id))}
              title="Delete task"
              aria-label={`Delete task: ${todo.text}`}
            >
              🗑️
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default TodoItem;

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
            <button className="btn-text" onClick={handleSave} aria-label="Save changes">
              Save
            </button>
            <button className="btn-text" onClick={handleCancel} aria-label="Cancel editing">
              Cancel
            </button>
          </>
        ) : (
          <>
            <button className="btn-text edit-btn" onClick={() => setIsEditing(true)} aria-label={`Edit task: ${todo.text}`}>
              Edit
            </button>
            <button 
              className="btn-text delete-btn" 
              onClick={() => dispatch(deleteTodo(todo.id))}
              aria-label={`Delete task: ${todo.text}`}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default TodoItem;

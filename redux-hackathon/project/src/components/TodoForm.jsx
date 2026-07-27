import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todos/todoSlice';

const TodoForm = () => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault(); // This ensures pressing "Enter" submits the form natively
    if (!text.trim()) {
      setError('Please enter a task.');
      return;
    }
    dispatch(addTodo(text.trim()));
    setText('');
    setError('');
  };

  const handleChange = (e) => {
    setText(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="todo-form-container">
      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={text}
          onChange={handleChange}
          className={`todo-input ${error ? 'input-error' : ''}`}
        />
        <button 
          type="submit" 
          className="btn-primary"
          disabled={!text.trim()}
        >
          Add Task
        </button>
      </form>
      {error && <p className="validation-error">{error}</p>}
    </div>
  );
};

export default TodoForm;

import React, { useState } from 'react';
import { db } from '../../config';
import { ref, push, set, update, remove } from 'firebase/database';
import './TaskForm.css';

const TaskForm = ({ task, onCancel }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [assignedTo, setAssignedTo] = useState(task?.assignedTo || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const taskData = {
      title,
      description,
      assignedTo,
      status: task?.status || 'To Do',
      updatedAt: Date.now(),
      ...(!task && { createdAt: Date.now() }) // Only add for new tasks
    };

    if (task) {
      // Update existing task
      await update(ref(db, `tasks/${task.id}`), taskData);
    } else {
      // Create new task
      await push(ref(db, 'tasks'), taskData);
    }
    
    // Reset form if not editing
    if (!task) {
      setTitle('');
      setDescription('');
      setAssignedTo('');
    }
    
    if (onCancel) onCancel();
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await remove(ref(db, `tasks/${task.id}`));
      if (onCancel) onCancel();
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{task ? 'Edit Task' : 'Add New Task'}</h2>
      
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        required
      />
      
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
        required
      />
      
      <input
        type="email"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        placeholder="Assigned To (email)"
        required
      />
      
      <div className="form-actions">
        <button type="submit" className="save-btn">
          {task ? 'Save Changes' : 'Add Task'}
        </button>
        
        {task && (
          <button 
            type="button" 
            onClick={handleDelete}
            className="delete-btn"
          >
            Delete Task
          </button>
        )}
        
        {(task || onCancel) && (
          <button 
            type="button" 
            onClick={onCancel}
            className="cancel-btn"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
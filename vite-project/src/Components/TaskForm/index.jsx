import React, { useState, useEffect } from 'react';
import './TaskForm.css';
import { db } from '../../config';
import { ref, set, update } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

const TaskForm = ({ onCancel, task = null }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setAssignedTo(task.assignedTo);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const taskData = {
      title,
      description,
      assignedTo,
      status: task ? task.status : 'To Do',
      createdAt: task ? task.createdAt : Date.now(),
    };
  
    if (task) {
      // Update existing task
      update(ref(db, `tasks/${task.id}`), taskData)
        .then(() => {
          console.log('Task updated!');
          onCancel(); // Close form
        })
        .catch((err) => console.error('Error updating task:', err));
    } else {
      // Create new task
      const newTaskId = Date.now();
      set(ref(db, `tasks/${newTaskId}`), taskData)
        .then(() => {
          console.log('Task added!');
          setTitle('');
          setDescription('');
          setAssignedTo('');
          onCancel();  
        })
        .catch((err) => console.error('Firebase error:', err));
    }
  };
  

  return (
    <div className="form-modal">
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
          <button type="button" onClick={onCancel} className="cancel-btn">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;

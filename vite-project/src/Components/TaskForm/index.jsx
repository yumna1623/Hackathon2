import React, { useState } from 'react';
import './TaskForm.css';
import { db } from '../../config'; 
import { ref, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

const TaskForm = ({ onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTaskId = Date.now();

    const taskData = {
      title,
      description,
      assignedTo,
      status: 'To Do',
      createdAt: Date.now(),
    };

    set(ref(db, `tasks/${newTaskId}`), taskData)
      .then(() => {
        console.log('Task added!');
        setTitle('');
        setDescription('');
        setAssignedTo('');
        navigate('/taskboard'); // ✅ Redirect to TaskBoard
      })
      .catch((err) => {
        console.error('Firebase error:', err);
      });
  };

  return (
    <div className="form-modal">
      <form className="task-form" onSubmit={handleSubmit}>
        <h2>Add New Task</h2>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task Title" required />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Task Description" required />
        <input type="email" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} placeholder="Assigned To (email)" required />

        <div className="form-actions">
          <button type="submit" className="save-btn">Add Task</button>
          
          <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;

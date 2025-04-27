// TaskForm.js
import React, { useState } from 'react';
import './TaskForm.css';
import { db, ref, set } from '../../config'; 

const TaskForm = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log("Task to be added:", { title, description, assignedTo });

    const newTaskId = Date.now();

    console.log("Generated Task ID:", newTaskId);

    const taskRef = ref(db, `tasks/${newTaskId}`);
    
    set(taskRef, {
      title,
      description,
      assignedTo,
      status: 'To Do', 
      createdAt: Date.now(),
    })
      .then(() => {
        console.log('Task successfully added to Firebase!');
        onSubmit({
          title,
          description,
          assignedTo,
        });

        // Reset form fields
        setTitle('');
        setDescription('');
        setAssignedTo('');
      })
      .catch((error) => {
        console.error('Error adding task to Firebase:', error);
      });
  };

  return (
    <div className="form-modal">
      <form className="task-form" onSubmit={handleSubmit}>
        <h2>Add New Task</h2>

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
            Add Task
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

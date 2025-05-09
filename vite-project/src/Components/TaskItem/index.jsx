// components/TaskItem.jsx
import React from 'react';
import { ref, update, remove } from 'firebase/database';
import { db } from '../../config';

const TaskItem = ({ task, onEdit }) => {
  const handleStatusChange = async (e) => {
    const taskRef = ref(db, `tasks/${task.id}`);
    await update(taskRef, { status: e.target.value, updatedAt: Date.now() });
  };

  const handleDelete = async () => {
    const taskRef = ref(db, `tasks/${task.id}`);
    await remove(taskRef);
  };

  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Assigned To: {task.assignedTo}</p>

      <select value={task.status} onChange={handleStatusChange}>
        <option>To Do</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>

      <button onClick={() => onEdit(task)}>Edit</button>

      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TaskItem;

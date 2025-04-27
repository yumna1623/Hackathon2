import React, { useState } from 'react';
import { ref, update, remove } from 'firebase/database'; 
import { db } from '../../config';
import './TaskList.css';
import TaskForm from '../TaskForm';

const TaskList = ({ tasks }) => {
  const [editingTask, setEditingTask] = useState(null);
  if (!tasks) {
    return <div className="loading">.........................................................</div>;
  }

  const updateStatus = async (taskId, newStatus) => {
    await update(ref(db, `tasks/${taskId}`), {
      status: newStatus,
      updatedAt: Date.now(),
    });
  };

  // Delete a task
  const handleDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await remove(ref(db, `tasks/${taskId}`));
    }
  };

  return (
    <div className="task-container">
      {editingTask ? (
        <TaskForm
          task={editingTask}
          onCancel={() => setEditingTask(null)}
        />
      ) : (
        <div className="task-grid">
          {Object.entries(tasks).map(([taskId, task]) => (
            <div key={taskId} className={`task-card ${task.status.toLowerCase().replace(' ', '-')}`}>
              <div className="task-header">
                <h3>{task.title}</h3>
                <span className="status-badge">{task.status}</span>
              </div>

              <p className="task-desc">{task.description}</p>
              <p className="task-assignee">@{task.assignedTo}</p>

              <div className="task-footer">
                <div className="status-actions">
                  {task.status === 'To Do' && (
                <button
                      onClick={() => updateStatus(taskId, 'In Progress')}
                      className="progress-btn"
                    >
                      Start Progress
                    </button>
                  )}

                  {task.status === 'In Progress' && (
                    <>
                      <button
                        onClick={() => updateStatus(taskId, 'To Do')}
                        className="back-btn"
                      >
                        Revert to To Do
                      </button>
                      <button
                        onClick={() => updateStatus(taskId, 'Done')}
                        className="complete-btn"
                      >
                        Mark Done
                      </button>
                    </>
                  )}

                  {task.status === 'Done' && (
                    <button
                      onClick={() => updateStatus(taskId, 'In Progress')}
                      className="progress-btn"
                    >
                      Reopen Task
                    </button>
                  )}
                </div>

                {/* Edit/Delete Buttons */}
                <div className="task-controls">
                  <button
                    onClick={() => setEditingTask({ id: taskId, ...task })}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(taskId)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;

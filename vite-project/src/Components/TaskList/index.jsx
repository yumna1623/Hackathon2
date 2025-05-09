import React, { useState, useRef } from "react";
import { ref, update, remove } from "firebase/database";
import { db } from "../../config";
import "./TaskList.css";
import TaskForm from "../TaskForm";

const TaskList = ({ searchQuery }) => {
  const [tasks, setTasks] = useState({}); // Initialize tasks state
  const formRef = useRef(null);

  // Ensure tasks is always an object to avoid runtime errors
  const tasksArray = tasks ? Object.entries(tasks) : [];

  // Filter tasks based on search query
  const filteredTasks = tasksArray.filter(
    ([taskId, task]) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [editingTask, setEditingTask] = useState(null);

  if (!tasks || tasksArray.length === 0) {
    return <div className="loading">No tasks available.</div>;
  }

  // Function to update task status in Firebase
  const updateStatus = (taskId, newStatus) => {
    const taskRef = ref(db, `tasks/${taskId}`);
    update(taskRef, { status: newStatus })
      .then(() => {
        console.log("Task status updated successfully.");
      })
      .catch((error) => {
        console.error("Error updating task status:", error);
      });
  };

  // Function to delete task from Firebase
  const handleDelete = (taskId) => {
    const taskRef = ref(db, `tasks/${taskId}`);
    remove(taskRef)
      .then(() => {
        console.log("Task deleted successfully.");
        setEditingTask(null); // Reset editing state after deletion
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  // Function to handle saving the edited task in Firebase
  const handleSaveEdit = (taskId, updatedTask) => {
    const taskRef = ref(db, `tasks/${taskId}`);
    update(taskRef, updatedTask)
      .then(() => {
        console.log("Task updated successfully.");
        setEditingTask(null); // Reset editing state after saving
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };

  return (
    <div className="task-container">
      {/* Always show TaskForm when editing */}
      {editingTask && (
        <TaskForm
          ref={formRef}
          task={editingTask}
          onSave={(updatedTask) => handleSaveEdit(editingTask.id, updatedTask)}
          onCancel={() => setEditingTask(null)}
        />
      )}
  
      {/* Always show Task List */}
      <div className="task-grid">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(([taskId, task]) => (
            <div
              key={taskId}
              className={`task-card ${task.status
                .toLowerCase()
                .replace(" ", "-")}`}
            >
              <div className="task-header">
                <h3>{task.title}</h3>
                <span className="status-badge">{task.status}</span>
              </div>
  
              <p className="task-desc">{task.description}</p>
              <p className="task-assignee">@{task.assignedTo}</p>
  
              <div className="task-footer">
                <div className="status-actions">
                  {task.status === "To Do" && (
                    <button
                      onClick={() => updateStatus(taskId, "In Progress")}
                      className="progress-btn"
                    >
                      Start Progress
                    </button>
                  )}
  
                  {task.status === "In Progress" && (
                    <>
                      <button
                        onClick={() => updateStatus(taskId, "To Do")}
                        className="back-btn"
                      >
                        Revert to To Do
                      </button>
                      <button
                        onClick={() => updateStatus(taskId, "Done")}
                        className="complete-btn"
                      >
                        Mark Done
                      </button>
                    </>
                  )}
  
                  {task.status === "Done" && (
                    <button
                      onClick={() => updateStatus(taskId, "In Progress")}
                      className="progress-btn"
                    >
                      Reopen Task
                    </button>
                  )}
                </div>
  
                {/* Edit/Delete Buttons */}
                <div className="task-controls">
                  <button
                    onClick={() => {
                      setEditingTask({ id: taskId, ...task });
                      setTimeout(() => {
                        formRef.current?.scrollIntoView({
                          behavior: "smooth",
                        });
                      }, 100);
                    }}
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
          ))
        ) : (
          <div className="no-tasks">No tasks found matching your search.</div>
        )}
      </div>
    </div>
  );
  
  
};

export default TaskList;

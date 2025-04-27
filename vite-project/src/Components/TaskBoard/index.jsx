
import React, { useState } from "react";
import "./TaskBoard.css";
import TaskForm from "../TaskForm";

const TaskBoard = () => {
  const [tasks, setTasks] = useState({
    inProgress: [{ id: 1, content: "Implement login page", due: "Tomorrow" }],
    todo: [{ id: 2, content: "Design database schema", due: "Friday" }],
    done: [{ id: 3, content: "Project setup", due: "Completed" }],
  });
  const [showTaskForm, setShowTaskForm] = useState(false);

  const addTask = (newTask) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      inProgress: [
        ...prevTasks.inProgress,
        {
          id: Date.now(),
          content: newTask.title,
          due: "No due date",
          description: newTask.description,
          assignedTo: newTask.assignedTo,
        },
      ],
    }));
    setShowTaskForm(false);
  };

  const moveTask = (taskId, fromColumn, toColumn) => {
    const taskToMove = tasks[fromColumn].find((task) => task.id === taskId);
    if (!taskToMove) return;

    const updatedFromColumn = tasks[fromColumn].filter(
      (task) => task.id !== taskId
    );
    const updatedToColumn = [...tasks[toColumn], taskToMove];

    setTasks({
      ...tasks,
      [fromColumn]: updatedFromColumn,
      [toColumn]: updatedToColumn,
    });
  };

  const deleteTask = (taskId, column) => {
    setTasks({
      ...tasks,
      [column]: tasks[column].filter((task) => task.id !== taskId),
    });
  };

  return (
    <div className="task-board">
      <h1>Task Board</h1>
      
      {/* Add this button to show the form */}
      <button 
        className="add-task-btn" 
        onClick={() => setShowTaskForm(true)}
      >
        + Add Task
      </button>

      {showTaskForm && (
        <TaskForm onCancel={() => setShowTaskForm(false)} onSubmit={addTask} />
      )}

      <div className="columns-container">
        {/* In Progress Column */}
        <div className="column in-progress">
          <h2>In Progress</h2>
          <div className="tasks">
            {tasks.inProgress.length === 0 ? (
              <p>No tasks to display</p>
            ) : (
              tasks.inProgress.map((task) => (
                <div className="task" key={task.id}>
                  <div className="task-content">{task.content}</div>
                  {task.description && (
                    <div className="task-desc">{task.description}</div>
                  )}
                  {task.assignedTo && (
                    <div className="task-assignee">@{task.assignedTo}</div>
                  )}
                  <div className="task-footer">
                    <small>Due: {task.due}</small>
                    <div>
                      <button
                        className="task-action"
                        onClick={() => moveTask(task.id, "inProgress", "done")}
                      >
                        → Move to Done
                      </button>
                      <button
                        className="task-action"
                        onClick={() => moveTask(task.id, "inProgress", "todo")}
                      >
                        → Move to To Do
                      </button>
                      <button
                        className="task-delete"
                        onClick={() => deleteTask(task.id, "inProgress")}
                      >
                        × Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Todo Column */}
        <div className="column todo">
          <h2>To Do</h2>
          <div className="tasks">
            {tasks.todo.length === 0 ? (
              <p>No tasks to display</p>
            ) : (
              tasks.todo.map((task) => (
                <div className="task" key={task.id}>
                  <div className="task-content">{task.content}</div>
                  {task.description && (
                    <div className="task-desc">{task.description}</div>
                  )}
                  {task.assignedTo && (
                    <div className="task-assignee">@{task.assignedTo}</div>
                  )}
                  <div className="task-footer">
                    <small>Due: {task.due}</small>
                    <div>
                      <button
                        className="task-action"
                        onClick={() => moveTask(task.id, "todo", "inProgress")}
                      >
                        → Move to In Progress
                      </button>
                      <button
                        className="task-delete"
                        onClick={() => deleteTask(task.id, "todo")}
                      >
                        × Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Done Column */}
        <div className="column done">
          <h2>Done</h2>
          <div className="tasks">
            {tasks.done.length === 0 ? (
              <p>No tasks to display</p>
            ) : (
              tasks.done.map((task) => (
                <div className="task" key={task.id}>
                  <div className="task-content">{task.content}</div>
                  {task.description && (
                    <div className="task-desc">{task.description}</div>
                  )}
                  {task.assignedTo && (
                    <div className="task-assignee">@{task.assignedTo}</div>
                  )}
                  <div className="task-footer">
                    <small>Due: {task.due}</small>
                    <div>
                      <button
                        className="task-action"
                        onClick={() => moveTask(task.id, "done", "inProgress")}
                      >
                        → Move to In Progress
                      </button>
                      <button
                        className="task-delete"
                        onClick={() => deleteTask(task.id, "done")}
                      >
                        × Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;
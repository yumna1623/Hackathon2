import React, { useEffect, useState } from "react";
import { ref, onValue, update, remove } from "firebase/database";
import { db } from "../../config";
import "./TaskBoard.css";

const TaskBoard = ({ searchQuery }) => {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  // Load tasks from Firebase and categorize them
  useEffect(() => {
    const tasksRef = ref(db, "tasks");

    const unsubscribe = onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      const allTasks = data
        ? Object.entries(data).map(([id, task]) => ({ id, ...task }))
        : [];

      const grouped = {
        todo: [],
        inProgress: [],
        done: [],
      };

      allTasks.forEach((task) => {
        if (task.status === "To Do") grouped.todo.push(task);
        else if (task.status === "In Progress") grouped.inProgress.push(task);
        else if (task.status === "Done") grouped.done.push(task);
      });

      setTasks(grouped);
    });

    return () => unsubscribe();
  }, []);

  // Move task to another column (updates status in Firebase)
  const moveTask = (taskId, toColumn) => {
    const taskRef = ref(db, `tasks/${taskId}`);
    const statusMap = {
      todo: "To Do",
      inProgress: "In Progress",
      done: "Done",
    };

    update(taskRef, { status: statusMap[toColumn] }).catch((error) =>
      console.error("Failed to move task:", error)
    );
  };

  // Delete task from Firebase
  const deleteTask = (taskId) => {
    const taskRef = ref(db, `tasks/${taskId}`);
    remove(taskRef).catch((error) =>
      console.error("Failed to delete task:", error)
    );
  };

  // Filter tasks based on search query
  const filterTasks = (taskList) => {
    return taskList.filter(
      (task) =>
        task.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Check if tasks are available in each category after filtering
  const filteredTodo = filterTasks(tasks.todo);
  const filteredInProgress = filterTasks(tasks.inProgress);
  const filteredDone = filterTasks(tasks.done);

  return tasks.todo.length === 0 &&
    tasks.inProgress.length === 0 &&
    tasks.done.length === 0 ? (
    <div className="loading">Click on Add Task Button on your top right</div>
  ) : (
    <div className="task-board">
      <div className="columns-container">
        {/* Todo Column */}
        <div className="column todo">
          <h2>To Do</h2>
          <div className="tasks">
            {filteredTodo.length === 0 ? (
              <div className="no-tasks">No tasks found</div>
            ) : (
              filteredTodo.map((task) => (
                <div className="task" key={task.id}>
                  <div className="task-content">{task.title || task.content}</div>
                  {task.description && (
                    <div className="task-desc">{task.description}</div>
                  )}
                  {task.assignedTo && (
                    <div className="task-assignee">Assigned To : @{task.assignedTo}</div>
                  )}
                  <div className="task-footer">
                    <small>
                      Created: {new Date(task.createdAt).toLocaleDateString()}
                    </small>
                    <div>
                      <button
                        className="task-action"
                        onClick={() => moveTask(task.id, "inProgress")}
                      >
                        → Move to In Progress
                      </button>
                      <button
                        className="task-delete"
                        onClick={() => deleteTask(task.id)}
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

        {/* In Progress Column */}
        <div className="column in-progress">
          <h2>In Progress</h2>
          <div className="tasks">
            {filteredInProgress.length === 0 ? (
              <div className="no-tasks">No tasks found</div>
            ) : (
              filteredInProgress.map((task) => (
                <div className="task" key={task.id}>
                  <div className="task-content">{task.title || task.content}</div>
                  {task.description && (
                    <div className="task-desc">{task.description}</div>
                  )}
                  {task.assignedTo && (
                    <div className="task-assignee">@{task.assignedTo}</div>
                  )}
                  <div className="task-footer">
                    <small className="created_progress_col">
                      Created: {new Date(task.createdAt).toLocaleDateString()}
                    </small>
                    <div>
                      <button
                        className="task-action"
                        onClick={() => moveTask(task.id, "done")}
                      >
                        → Move to Done
                      </button>
                      <button
                        className="task-action"
                        onClick={() => moveTask(task.id, "todo")}
                      >
                        → Move to To Do
                      </button>
                      <button
                        className="task-delete"
                        onClick={() => deleteTask(task.id)}
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
            {filteredDone.length === 0 ? (
              <div className="no-tasks">No tasks found</div>
            ) : (
              filteredDone.map((task) => (
                <div className="task" key={task.id}>
                  <div className="task-content">{task.title || task.content}</div>
                  {task.description && (
                    <div className="task-desc">{task.description}</div>
                  )}
                  {task.assignedTo && (
                    <div className="task-assignee">@{task.assignedTo}</div>
                  )}
                  <div className="task-footer">
                    <small className="created_done_col">
                      Created: {new Date(task.createdAt).toLocaleDateString()}
                    </small>
                    <div>
                      <button
                        className="task-action"
                        onClick={() => moveTask(task.id, "inProgress")}
                      >
                        → Move to In Progress
                      </button>
                      <button
                        className="task-delete"
                        onClick={() => deleteTask(task.id)}
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

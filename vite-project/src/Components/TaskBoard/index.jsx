import React, { useEffect, useState } from "react";
import { ref, onValue, update, remove } from "firebase/database";
import { db } from "../../config";
import "./TaskBoard.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TaskBoard = ({ searchQuery }) => {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

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

  const deleteTask = (taskId) => {
    const taskRef = ref(db, `tasks/${taskId}`);
    remove(taskRef).catch((error) =>
      console.error("Failed to delete task:", error)
    );
  };

  const filterTasks = (taskList) => {
    return taskList.filter(
      (task) =>
        task.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    moveTask(draggableId, destination.droppableId);
  };

  const filteredTodo = filterTasks(tasks.todo);
  const filteredInProgress = filterTasks(tasks.inProgress);
  const filteredDone = filterTasks(tasks.done);

  return tasks.todo.length === 0 &&
    tasks.inProgress.length === 0 &&
    tasks.done.length === 0 ? (
    <div className="loading">Click on Add Task Button on your top right</div>
  ) : (
    <div className="task-board">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="columns-container">
          {/* Columns */}
          {[
            { id: "todo", title: "To Do", tasks: filteredTodo },
            { id: "inProgress", title: "In Progress", tasks: filteredInProgress },
            { id: "done", title: "Done", tasks: filteredDone },
          ].map((column) => (
            <Droppable key={column.id} droppableId={column.id}>
              {(provided) => (
                <div
                  className={`column ${column.id}`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2>{column.title}</h2>
                  <div className="tasks">
                    {column.tasks.length === 0 ? (
                      <div className="no-tasks">No tasks found</div>
                    ) : (
                      column.tasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <div
                              className="task"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className="task-content">{task.title || task.content}</div>
                              {task.description && (
                                <div className="task-desc">{task.description}</div>
                              )}
                              {task.assignedTo && (
                                <div className="task-assignee">
                                  Assigned To : @{task.assignedTo}
                                </div>
                              )}
                              <div className="task-footer">
                                <small>
                                  Created:{" "}
                                  {new Date(task.createdAt).toLocaleDateString()}
                                </small>
                                <div>
                                  {column.id !== "done" && (
                                    <button
                                      className="task-action"
                                      onClick={() =>
                                        moveTask(
                                          task.id,
                                          column.id === "todo"
                                            ? "inProgress"
                                            : "done"
                                        )
                                      }
                                    >
                                      → Move to{" "}
                                      {column.id === "todo"
                                        ? "In Progress"
                                        : "Done"}
                                    </button>
                                  )}
                                  {column.id !== "todo" && (
                                    <button
                                      className="task-action"
                                      onClick={() =>
                                        moveTask(
                                          task.id,
                                          column.id === "done"
                                            ? "inProgress"
                                            : "todo"
                                        )
                                      }
                                    >
                                      → Move to{" "}
                                      {column.id === "done"
                                        ? "In Progress"
                                        : "To Do"}
                                    </button>
                                  )}
                                  <button
                                    className="task-delete"
                                    onClick={() => deleteTask(task.id)}
                                  >
                                    × Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))
                    )}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;

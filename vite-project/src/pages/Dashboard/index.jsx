


import { TaskList,TaskForm, TaskBoard } from"../../Components"
export default function Dashboard() {
  return (

    <div>
    <h1>Task Tracker</h1>
    {/* <TaskForm /> */}
    <TaskList />
    <TaskBoard />
  </div>
  )
}
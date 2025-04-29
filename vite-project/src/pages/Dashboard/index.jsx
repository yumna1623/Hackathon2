


import { TaskList,TaskForm, TaskBoard , NavBar } from"../../Components"
export default function Dashboard() {
  return (

    <div>
        <NavBar />
    <h1>Task Tracker</h1>
    <TaskList />
    <TaskBoard />
  </div>
  )
}
// import Sidebar from "../components/Sidebar";
// import TopCards from "../components/TopCards";
// import TasksSection from "../components/TasksSection";
// import CalendarWidget from "../components/CalendarWidget";


import { TaskList,TaskForm, Header } from"../../Components"
export default function Dashboard() {
  return (

    <div>
        <Header />
    <h1>Task Tracker</h1>
    <TaskForm />
    <TaskList />
  </div>
  )
}
import Sidebar from "../components/Sidebar";
import TopCards from "../components/TopCards";
import TasksSection from "../components/TasksSection";
import CalendarWidget from "../components/CalendarWidget";
import MiniTaskList from "../components/MiniTaskList";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4 bg-gray-50 min-h-screen">
        <TopCards />
        <TasksSection />
        <div className="flex gap-4 mt-4">
          <CalendarWidget />
          <MiniTaskList />
        </div>
      </main>
    </div>
  );
}

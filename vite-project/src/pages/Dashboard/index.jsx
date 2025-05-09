import React, { useState } from "react";
import {NavBar, TaskBoard, TaskList} from "../../Components";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <NavBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <TaskList searchQuery={searchQuery} />
      <TaskBoard searchQuery={searchQuery} />
    </>
  );
};

export default Dashboard;

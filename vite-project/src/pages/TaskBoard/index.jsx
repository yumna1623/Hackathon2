import React from 'react'
import { NavBar, TaskBoard } from '../../Components'

function TaskBoardPage() {
  return (
    <div>
        <NavBar />
        <h1 className='TaskBoard' >Task Board</h1>
      <TaskBoard />
    </div>
  )
}

export default TaskBoardPage

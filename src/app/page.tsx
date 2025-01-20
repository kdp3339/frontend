"use client"

import { useState } from "react"
import { TodoList } from "@/src/components/TodoList"
import { CreateTaskButton } from "@/src/components/CreateTaskButton"
import { TaskCounters } from "@/src/components/TaskCounters"

interface Task {
  id: number
  title: string
  completed: boolean
  color: string
}

export default function Home() {
  const [taskCounts, setTaskCounts] = useState({ total: 0, completed: 0 })

  const handleTasksChange = (tasks: Task[]) => {
    setTaskCounts({
      total: tasks.length,
      completed: tasks.filter((t) => t.completed).length,
    })
  }

  return (
    <div className="space-y-6">
      <CreateTaskButton />
      <TaskCounters total={taskCounts.total} completed={taskCounts.completed} />
      <TodoList onTasksChange={handleTasksChange} />
    </div>
  )
}

  